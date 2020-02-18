/** @format */

import { Component, OnInit, Input } from '@angular/core';

import { LedgerService } from '../../../core/services/ledger.service';
import { CustomGridColumns } from 'src/app/shared/data-view/data-view.component';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-grids';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-ledger-view',
    templateUrl: './ledger-view.component.html',
    styleUrls: ['./ledger-view.component.css'],
    // encapsulation: ViewEncapsulation.
})
export class LedgerViewComponent implements OnInit {
    @Input()
    public data: Subject<DataStateChangeEventArgs>;

    @Input()
    public ledgerData: Subject<DataStateChangeEventArgs>;

    @Input()
    public showAddLedger: Boolean = true;

    @Input()
    public showUnposted = false;

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

    constructor(private ledgerService: LedgerService) {
        this.data = this.ledgerService;
        this.showUnposted = false;
    }
    ngOnInit() {
        if (this.showUnposted) {
            this.ledgerService.executeUnpostedEntries({ skip: 0, take: 50 });
        } else {
            this.ledgerService.execute({ skip: 0, take: 50 });
        }
    }

    deleteLedgerEntry(data: any) {
        this.ledgerService.deleteLedgerEntry(data['Id']).subscribe();
    }

    editLedgerEntry(data: any) {
        alert('edit');
    }

    onDataStateChanged(state: DataStateChangeEventArgs): void {
        if (this.showUnposted) {
            this.ledgerService.executeUnpostedEntries(state);
        } else {
            this.ledgerService.execute(state);
        }
    }
}
