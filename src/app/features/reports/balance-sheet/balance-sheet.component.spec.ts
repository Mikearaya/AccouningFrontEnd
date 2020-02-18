/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetComponent } from './balance-sheet.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportApiService } from '../report-api.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('BalanceSheetComponent', () => {
    let component: BalanceSheetComponent;
    let fixture: ComponentFixture<BalanceSheetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [BalanceSheetComponent],
            providers: [ReportApiService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BalanceSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
