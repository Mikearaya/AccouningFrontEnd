/** @format */

import { Component, OnInit } from '@angular/core';
import { ReportApiService } from '../report-api.service';
import { CostOfGoodsSoldModel } from '../report';

@Component({
    selector: 'app-cost-of-goods-sold',
    templateUrl: './cost-of-goods-sold.component.html',
    styleUrls: ['./cost-of-goods-sold.component.css'],
})
export class CostOfGoodsSoldComponent implements OnInit {
    public data: CostOfGoodsSoldModel;
    public searchString: string;
    lastFilter: string;
    constructor(private reportService: ReportApiService) {}

    ngOnInit() {
        this.reportService
            .getCostOfGoodsSold(this.searchString)
            .subscribe((data: CostOfGoodsSoldModel) => {
                this.data = data;
            });
    }
    print() {
        window.print();
    }

    onFiltered(data: string = ''): void {
        this.lastFilter = data;

        this.reportService
            .getCostOfGoodsSold(`${data}`)
            .subscribe((result: CostOfGoodsSoldModel) => {
                this.data = result;
            });
    }
}
