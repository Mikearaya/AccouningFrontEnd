/** @format */

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-un-authorized-page',
    templateUrl: './un-authorized-page.component.html',
    styleUrls: ['./un-authorized-page.component.css'],
})
export class UnAuthorizedPageComponent implements OnInit {
    @ViewChild('element1') element1;

    constructor() {}

    ngOnInit() {}
}
