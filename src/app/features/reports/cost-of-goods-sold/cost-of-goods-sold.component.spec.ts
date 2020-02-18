/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfGoodsSoldComponent } from './cost-of-goods-sold.component';
import { ReportApiService } from '../report-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('CostOfGoodsSoldComponent', () => {
    let component: CostOfGoodsSoldComponent;
    let fixture: ComponentFixture<CostOfGoodsSoldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [CostOfGoodsSoldComponent],
            providers: [ReportApiService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CostOfGoodsSoldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
