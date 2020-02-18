/** @format */

import {
    Component,
    OnInit,
    ViewChild,
    Input,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import { PagerComponent } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
    @Output()
    public pageChanged: EventEmitter<PageChanged> = new EventEmitter();
    constructor() {}
    @ViewChild('pagger')
    public pagger: PagerComponent;
    private previous: number;

    page;
    @Input()
    public pageSizes: number[];

    @Input()
    public pageSize: number;
    @Input()
    public totalPage: number;

    public pageCount: number;
    public currentPage: number;

    ngOnChanges(changes: any): void {
        this.pageCount = this.totalPage / this.pageSize;
    }

    ngOnInit() {
        this.pageSizes = [10, 20, 30];
        this.currentPage = this.pagger.currentPage;
    }

    click(event: any): void {
        if (this.previous !== this.pagger.currentPage) {
            this.pageChanged.emit({
                pageNumber: this.pagger.currentPage,
                pageSize: this.pageSize,
            });
        }

        this.previous = this.pagger.currentPage;
    }

    getCurrentPage(): number {
        return this.pagger.currentPage;
    }

    getPageSize(): number {
        return this.pageSize;
    }
}

export interface PageChanged {
    pageNumber: number;
    pageSize: number;
}
