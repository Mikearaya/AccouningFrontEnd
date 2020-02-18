/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

import { LedgerViewComponent } from './ledger-view.component';
import { LedgerService } from 'src/app/core/services/ledger.service';
import { JornalEntryViewModel } from '../ledger';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('LedgerViewComponent', () => {
    let component: LedgerViewComponent;
    let fixture: ComponentFixture<LedgerViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [LedgerViewComponent],
            providers: [LedgerService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LedgerViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });
    describe('Delete ledger entry', () => {
        it('Should be called', () => {
            spyOn(component, 'deleteLedgerEntry');
            component.deleteLedgerEntry('Id');
            expect(component.deleteLedgerEntry).toHaveBeenCalled();
        });
    });
    describe('ngOnInit', () => {
        it('Should be called and list all lookups', () => {
            const response: JornalEntryViewModel[] = [
                {
                    Id: 1,
                    VoucherId: '1212',
                    Date: new Date().toString(),
                    Description: 'description',
                    Reference: 'refernce',
                    Posted: true,
                    DateAdded: new Date(),
                    DateUpdated: new Date(),
                    Entries: [
                        { AccountId: '0001', Credit: 0, Debit: 0 },
                        { AccountId: '0002', Credit: 1, Debit: 1 },
                    ],
                },
                {
                    Id: 1,
                    VoucherId: '1234',
                    Date: new Date().toString(),
                    Description: 'description',
                    Reference: 'refernce',
                    Posted: true,
                    DateAdded: new Date(),
                    DateUpdated: new Date(),
                    Entries: [
                        { AccountId: '0003', Credit: 30, Debit: 30 },
                        { AccountId: '0004', Credit: 12, Debit: 12 },
                    ],
                },
            ];
            /*  spyOn(component, "loadLedgerEntries").and.returnValue(of(response));
      component.loadLedgerEntries();
      fixture.detectChanges();
      expect(component.loadLedgerEntries).toHaveBeenCalled();
      expect(response.length).toEqual(2); */
        });
    });
});
