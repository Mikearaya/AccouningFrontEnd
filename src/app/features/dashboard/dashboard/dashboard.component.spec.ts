/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';
import { LedgerService } from 'src/app/core/services/ledger.service';
import { LedgerViewComponent } from '../../ledgers/ledger-view/ledger-view.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    const ledgerService: LedgerService = null;
    const accountingAService: AccountingApiService = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [DashboardComponent, LedgerViewComponent],
            providers: [LedgerService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
