/** @format */

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-print-header',
    template: `
        <div class="header">
            <div class="row">
                <div class="col-12">
                    <p>ECAFCO SHARE COMPANY</p>
                    <p>{{ today | date }}</p>
                    <p>{{ header }}</p>
                    <p>For THE YEAR OF 2011</p>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./print-header.component.css'],
})
export class PrintHeaderComponent implements OnInit {
    public today = new Date();
    @Input() public header = '';

    constructor() {}

    ngOnInit() {}
}
