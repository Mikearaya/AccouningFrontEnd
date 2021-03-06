/** @format */

import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsScheduleApiService } from './accounts-schedule-api.service';
import { Router } from '@angular/router';
import {
    ExcelExportProperties,
    FilterSettingsModel,
    TextWrapSettingsModel,
    ToolbarItems,
    EditSettingsModel,
    PageSettingsModel,
    GroupSettingsModel,
    DataStateChangeEventArgs,
    GridModel,
} from '@syncfusion/ej2-grids';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { PageSizes } from 'src/app/page-model';
import { Subject } from 'rxjs';
import {
    QueryString,
    FilterEventModel,
} from 'src/app/shared/data-view/data-view.model';
import { ReportFilterModel } from 'src/app/shared/filter-option/filter';
import { HttpErrorResponse } from '@angular/common/http';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';

@Component({
    selector: 'app-accounts-schedule',
    templateUrl: './accounts-schedule.component.html',
    styleUrls: ['./accounts-schedule.component.css'],
})
export class AccountsScheduleComponent implements OnInit {
    title = 'Account Schedule';

    @ViewChild('grid')
    public grid: GridComponent;
    public excelExportProperties: ExcelExportProperties;
    public filterSettings: FilterSettingsModel;
    public toolbarOptions: object[];
    public wrapSettings: TextWrapSettingsModel;
    public toolbar: ToolbarItems[];
    public editSettings: EditSettingsModel;
    public items: ItemModel[];

    public pageSettings: PageSettingsModel;
    public filterOptions: FilterSettingsModel;
    public groupOptions: GroupSettingsModel = { showDropArea: true };
    public pageSizes: string[] = PageSizes;
    public initialPage: { pageSize: string; pageSizes: string[] };

    public data: Subject<DataStateChangeEventArgs>;
    public pageOptions: object;
    public state: DataStateChangeEventArgs;
    filterData: ReportFilterModel;
    stateData: DataStateChangeEventArgs;

    public childGrid: GridModel;
    query: QueryString;

    constructor(
        private router: Router,
        private accountScheduleApi: AccountsScheduleApiService
    ) {
        this.data = this.accountScheduleApi;
        this.initialPage = {
            pageSize: PageSizes[0],
            pageSizes: this.pageSizes,
        };
        this.items = [{ text: 'Control Account' }];

        this.filterOptions = { type: 'Menu' }; // put unique filter menue for each column based on the column type
        this.query = new QueryString();
        this.filterData = new ReportFilterModel();
    }

    onFilterStateChange(filterData: ReportFilterModel): void {
        this.filterData = filterData;
        this.accountScheduleApi.execute(this.stateData, filterData);
    }

    onDataStateChange(state: DataStateChangeEventArgs): void {
        this.stateData = state;
        this.accountScheduleApi.execute(state, this.filterData);
    }
    public databound(args) {
        this.grid.groupModule.collapseAll();
    }

    ngOnInit() {
        setTimeout(() => {
            this.groupOptions = {
                disablePageWiseAggregates: false,
                showDropArea: true,
                columns: ['ControlAccountId'],
            };
        }, 300);

        this.pageSettings = { pageSize: 5, pageCount: 4, currentPage: 1 };
        const state = { skip: 0, take: 20 };

        this.editSettings = { allowDeleting: true };
        this.toolbarOptions = [
            { text: 'Expand All', prefixIcon: 'e-expand', id: 'expandall' },
            {
                text: 'Collapse All',
                prefixIcon: 'e-collapse',
                id: 'collapseall',
            },
            { text: 'Print', prefixIcon: 'e-print', id: 'print' },
            {
                text: 'ExcelExport',
                prefixIcon: 'e-Excel_Export',
                id: 'Grid_excelexport',
            },
        ];

        this.accountScheduleApi.execute({ skip: 0, take: 50 }, this.filterData);
    }

    handleError(error: HttpErrorResponse) {
        console.log(error);
    }

    // Click handler for when the toolbar is cliked
    toolbarClick(args: ClickEventArgs): void {
        if (args.item.id === 'expandall') {
            this.grid.groupModule.expandAll();
        }
        if (args.item.id === 'collapseall') {
            this.grid.groupModule.collapseAll();
        }
        if (args.item.id === 'print') {
            // const currentPageSize = this.grid.pageSettings.pageSize;
            // this.grid.pageSettings.pageSize = this.grid.pageSettings.totalRecordsCount;
            this.grid.groupModule.expandAll();
            setTimeout(() => {
                window.print();
                // this.grid.pageSettings.pageSize = currentPageSize;
            }, 1000);
        }
        if (args.item.id === 'Grid_excelexport') {
            // const currentPageSize = this.grid.pageSettings.pageSize;
            // this.grid.pageSettings.pageSize = this.grid.pageSettings.totalRecordsCount;
            setTimeout(() => {
                this.grid.excelExport(this.getExcelExportProperties());
                // this.grid.pageSettings.pageSize = currentPageSize;
            }, 1000);
        }
    }

    private getExcelExportProperties(): any {
        return {
            header: {
                headerRows: 5,
                rows: [
                    {
                        cells: [
                            {
                                colSpan: 4,
                                rowSpan: 3,
                                value: 'Account Schedules',
                                style: {
                                    fontSize: 25,
                                    hAlign: 'Center',
                                    bold: true,
                                },
                            },
                        ],
                    },
                ],
            },
            footer: {
                footerRows: 4,
                rows: [
                    {
                        cells: [
                            {
                                colSpan: 4,
                                value: 'Thank you for your business!',
                                style: { hAlign: 'Center', bold: true },
                            },
                        ],
                    },
                    {
                        cells: [
                            {
                                colSpan: 4,
                                value: 'Visit again!',
                                style: { hAlign: 'Center', bold: true },
                            },
                        ],
                    },
                ],
            },
        };
    }
}
