/** @format */

import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';
import { DashboardViewModel } from 'src/app/Services/system-data.model';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-grids';
import { LedgerService } from 'src/app/core/services/ledger.service';
import { Subject } from 'rxjs';
import { CustomGridColumns } from 'src/app/shared/data-view/data-view.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    constructor(
        private accountingService: AccountingApiService,
        private ledgerService: LedgerService
    ) {
        this.data = this.ledgerService;
        this.ledgerService.executeUnpostedEntries({ skip: 0, take: 50 });
    }
    @ViewChild('promptDialog')
    public promptDialog: DialogComponent;

    public data: Subject<DataStateChangeEventArgs>;

    public promptHeader = 'Unposted ledger entries';
    public showCloseIcon = true;
    public visible = true;
    public confirmCloseIcon = true;
    // public target: string = ".control-section";
    public animationSettings: object = { effect: 'Zoom' };
    public hide: any;

    public dashboardItems: {
        name: string;
        class: string;
        icon: string;
        value: number;
    }[] = [
        { name: 'Asset', class: 'Asset', icon: 'fas fa-wallet', value: 0 },
        { name: 'Capital', class: 'Capital', icon: 'fas fa-coins', value: 0 },
        {
            name: 'Liability',
            class: 'Liability',
            icon: 'fas fa-funnel-dollar',
            value: 0,
        },
        {
            name: 'Expence',
            class: 'Expence',
            icon: 'fas fa-comments-dollar',
            value: 0,
        },
        {
            name: 'Revenue',
            class: 'Revenue',
            icon: 'fas fa-hand-holding-usd',
            value: 0,
        },
        {
            name: 'Unposted Entries',
            class: 'unposted',
            icon: 'fas fa-hand-holding-usd',
            value: 0,
        },
    ];
    public primaryXAxis: object;
    public chartData: object[];
    public title: string;
    public marker: object;
    public titleStyle: object;

    public columnBluePrint: CustomGridColumns[] = [
        {
            key: 'Id',
            header: 'Id',
            visible: false,
            width: 30,
            type: 'number',
        },
        {
            key: 'Date',
            header: 'Date',
            visible: true,
            width: 30,
            type: 'date',
            format: 'yMd',
        },
        {
            key: 'Description',
            header: 'Description',
            visible: true,
            width: 90,
            type: 'string',
        },
        {
            key: 'Reference',
            header: 'DocumentNo',
            visible: true,
            width: 50,
            type: 'string',
        },
        {
            key: 'VoucherId',
            header: 'Voucher no',
            visible: true,
            width: 50,
            type: 'string',
        },
        {
            key: 'DateAdded',
            header: 'Added',
            visible: false,
            width: 90,
            type: 'date',
            format: 'yMd',
        },
        {
            key: 'DateUpdated',
            header: 'Updated',
            visible: false,
            width: 90,
            type: 'date',
            format: 'yMd',
        },
    ];

    public promptDlgButtons: Object[] = [
        {
            buttonModel: { content: 'Cancel' },
        },
    ];

    public promptDlgBtnClick: EmitType<object> = () => {
        this.promptDialog.hide();
    }

    public onOverlayClick() {
        this.promptDialog.hide();
    }

    ngOnInit(): void {
        this.chartData = [
            { month: 'Jan', sales: 35 },
            { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 },
            { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 },
            { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 },
            { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 },
            { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 },
            { month: 'Dec', sales: 32 },
        ];

        this.ledgerService.executeUnpostedEntries({ skip: 0, take: 50 });
        this.primaryXAxis = {
            valueType: 'Category',
        };
        this.marker = { visible: true, width: 10, height: 10 };
        this.title = 'Current Year Sales';
        this.titleStyle = {
            size: '18px',
            color: 'Red',
            textAlignment: 'Far',
            textOverflow: 'Wrap',
        };
        this.accountingService
            .getDashboardReport()
            .subscribe((data: DashboardViewModel) => {
                this.dashboardItems[0].value = data.TotalAssets;
                this.dashboardItems[1].value = data.TotalCapital;
                this.dashboardItems[2].value = data.TotalLiability;
                this.dashboardItems[3].value = data.TotalExpense;
                this.dashboardItems[4].value = data.TotalRevenue;
                this.dashboardItems[5].value = data.UnpostedEntries;
                this.chartData = data.SalesSummert;
            });
    }
    itemClicked(items: any) {
        if (items.name === 'Unposted Entries') {
            this.promptDialog.show();
        }
    }

    deleteLedgerEntry(data: any) {
        this.ledgerService.deleteLedgerEntry(data['Id']).subscribe();
    }

    onDataStateChanged(state: DataStateChangeEventArgs): void {
        this.ledgerService.executeUnpostedEntries(state);
    }
}
