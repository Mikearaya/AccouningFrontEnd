/** @format */

import { Component, OnInit } from '@angular/core';
import { LookupService } from '../../../core/services/lookup.service';
import { LookupView } from '../lookups';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-grids';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-lookup-view',
    templateUrl: './lookup-view.component.html',
    styleUrls: ['./lookup-view.component.css'],
})
export class LookupViewComponent implements OnInit {
    public data: Subject<DataStateChangeEventArgs>;
    public customAttributes: { class: string };
    public filterOptions: { type: string };
    public columnBluePrint = [
        {
            key: 'Id',
            header: 'Id',
            visible: true,
            width: '40',
            type: 'number',
        },
        {
            key: 'Type',
            header: 'Type',
            visible: true,
            width: '100',
            type: 'string',
        },
        {
            key: 'Value',
            header: 'Value',
            visible: true,
            width: '100',
            type: 'string',
        },
    ];

    constructor(private lookupApi: LookupService) {
        this.data = this.lookupApi;
    }
    ngOnInit() {
        this.lookupApi.execute({ skip: 0, take: 50 });
    }

    deleteLookup(data: any) {
        this.lookupApi
            .deleteLookup(data['Id'])
            .subscribe(() => alert('called'));
    }

    onDataStateChanged(state: DataStateChangeEventArgs): void {
        this.lookupApi.execute(state);
    }
}
