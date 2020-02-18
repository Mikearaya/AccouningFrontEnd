/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatmentComponent } from './income-statment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportApiService } from '../report-api.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('IncomeStatmentComponent', () => {
    let component: IncomeStatmentComponent;
    let fixture: ComponentFixture<IncomeStatmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [IncomeStatmentComponent],
            providers: [ReportApiService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IncomeStatmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
