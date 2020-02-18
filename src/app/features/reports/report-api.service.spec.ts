/** @format */

import { TestBed } from '@angular/core/testing';

import { ReportApiService } from './report-api.service';
import {
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { CoreModule } from 'src/app/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import {
    Checklist,
    SubsidaryLedgerViewModel,
    TrialBalanceDetailViewModel,
    ConsolidatedTrialBalanceViewModel,
    IncomeStatmentViewModel,
    BalanceSheetViewModel,
    AccountScheduleModel,
    CostOfGoodsSoldModel,
} from './report';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('ReportApiService', () => {
    let reportApi: ReportApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
            providers: [ReportApiService, AccountingApiService],
        });

        reportApi = TestBed.get(ReportApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(reportApi).toBeTruthy();
    });

    it('Should return all checklists', () => {
        const response: Checklist[] = [
            {
                ReferenceNumber: '100',
                Date: new Date(),
                Description: 'Appropration of Truck',
                Entries: [
                    {
                        ControlAccountId: '12',
                        SubAccountId: '11',
                        AccountId: '2222',
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        ControlAccountId: '12',
                        SubAccountId: '11',
                        AccountId: '2222',
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        ControlAccountId: '12',
                        SubAccountId: '11',
                        AccountId: '2222',
                        Credit: 2,
                        Debit: 2,
                    },
                ],
            },
            {
                ReferenceNumber: '101',
                Date: new Date(),
                Description: 'Appropration of Truck',
                Entries: [
                    {
                        ControlAccountId: '12',
                        SubAccountId: '11',
                        AccountId: '2222',
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        ControlAccountId: '12',
                        SubAccountId: '11',
                        AccountId: '2222',
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        ControlAccountId: '12',
                        SubAccountId: '11',
                        AccountId: '2222',
                        Credit: 2,
                        Debit: 2,
                    },
                ],
            },
        ];
        reportApi.getChecklistReport('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });
    it('Should get all subsidaries ledgers', () => {
        const response: SubsidaryLedgerViewModel[] = [
            {
                AccountId: '100',
                AccountType: 'acc type',
                SubAccountId: 'sub acc',
                AccountName: 'acc name',
                BBF: 123,
                Entries: [
                    {
                        ReferenceNumber: '12',
                        Date: new Date(),
                        VoucherId: '2222',
                        Credit: 2,
                        Debit: 2,
                        Balance: 123,
                    },
                    {
                        ReferenceNumber: '12',
                        Date: new Date(),
                        VoucherId: '2222',
                        Credit: 2,
                        Debit: 2,
                        Balance: 123,
                    },
                    {
                        ReferenceNumber: '12',
                        Date: new Date(),
                        VoucherId: '2222',
                        Credit: 2,
                        Debit: 2,
                        Balance: 123,
                    },
                ],
            },
            {
                AccountId: '101',
                AccountType: 'acc type',
                SubAccountId: 'sub acc',
                AccountName: 'acc name',
                BBF: 123,
                Entries: [
                    {
                        ReferenceNumber: '12',
                        Date: new Date(),
                        VoucherId: '2222',
                        Credit: 2,
                        Debit: 2,
                        Balance: 123,
                    },
                    {
                        ReferenceNumber: '12',
                        Date: new Date(),
                        VoucherId: '2222',
                        Credit: 2,
                        Debit: 2,
                        Balance: 123,
                    },
                    {
                        ReferenceNumber: '12',
                        Date: new Date(),
                        VoucherId: '2222',
                        Credit: 2,
                        Debit: 2,
                        Balance: 123,
                    },
                ],
            },
        ];
        reportApi.getSubsidaryLedgerReport('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });
    it('Should get trial balance detail', () => {
        const response: TrialBalanceDetailViewModel[] = [
            {
                Id: 1,
                AccountId: '100',
                AccountName: 'acc name',
                ControlAccountId: 11,
                Entries: [
                    {
                        AccountId: '100',
                        AccountName: 'acc name',
                        ControlAccountId: 1001,
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        AccountId: '100',
                        AccountName: 'acc name',
                        ControlAccountId: 1001,
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        AccountId: '100',
                        AccountName: 'acc name',
                        ControlAccountId: 1001,
                        Credit: 2,
                        Debit: 2,
                    },
                ],
            },
            {
                Id: 2,
                AccountId: '101',
                AccountName: 'acc name',
                ControlAccountId: 22,
                Entries: [
                    {
                        AccountId: '100',
                        AccountName: 'acc name',
                        ControlAccountId: 1011,
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        AccountId: '100',
                        AccountName: 'acc name',
                        ControlAccountId: 1011,
                        Credit: 2,
                        Debit: 2,
                    },
                    {
                        AccountId: '100',
                        AccountName: 'acc name',
                        ControlAccountId: 1011,
                        Credit: 2,
                        Debit: 2,
                    },
                ],
            },
        ];
        reportApi.getTrialBalanceDetail('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });

    it('Should get consolidated trial balance', () => {
        const response: ConsolidatedTrialBalanceViewModel[] = [
            {
                AccountId: '100',
                AccountName: 'acc name',
                Credit: 2,
                Debit: 2,
            },
            {
                AccountId: '100',
                AccountName: 'acc name',
                Credit: 2,
                Debit: 2,
            },
            {
                AccountId: '100',
                AccountName: 'acc name',
                Credit: 2,
                Debit: 2,
            },
            {
                AccountId: '101',
                AccountName: 'acc name',
                Credit: 2,
                Debit: 2,
            },
            {
                AccountId: '100',
                AccountName: 'acc name',
                Credit: 2,
                Debit: 2,
            },
            {
                AccountId: '100',
                AccountName: 'acc name',
                Credit: 2,
                Debit: 2,
            },
        ];

        reportApi.getConsolidatedTrialBalance('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        httpMock.verify();
    });

    it('Should get income statment', () => {
        const response: IncomeStatmentViewModel[] = [
            {
                Revenue: [
                    {
                        AccountType: 'Net sales',
                        Amount: 1000,
                    },
                    {
                        AccountType: 'Other income',
                        Amount: 20000,
                    },
                ],
                TotalRevenue: 100,
                CostOfGoodsSold: 1001,
                Expense: [
                    {
                        AccountType: 'Maintainance',
                        Amount: 1000,
                    },
                    {
                        AccountType: 'Water',
                        Amount: 20000,
                    },
                ],
                TotalExpense: 200,
                NetSurplus: 19099,
            },
        ];
        reportApi.getIncomeStatment('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });

    it('Should get balance sheet', () => {
        const response: BalanceSheetViewModel[] = [
            {
                Assets: [
                    {
                        AccountCategory: 'Fixed assets',
                        Amount: 1000,
                    },
                    {
                        AccountCategory: 'Stock',
                        Amount: 20000,
                    },
                ],
                TotalAsset: 21000,
                Capitals: [
                    {
                        AccountCategory: 'Share capital',
                        Amount: 1000,
                    },
                    {
                        AccountCategory: 'Net capital',
                        Amount: 20000,
                    },
                ],
                TotalCapital: 21000,
                Liabilities: [
                    {
                        AccountCategory: 'Bank overdraft',
                        Amount: 200,
                    },
                    {
                        AccountCategory: 'Devidend payable',
                        Amount: 300,
                    },
                ],
                TotalLiability: 500,
            },
        ];
        reportApi.getBalanceSheet('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });

    it('Should get account schedule', () => {
        const response: AccountScheduleModel[] = [
            {
                ParentAccountId: 123,
                ParentAccountName: 'parent',
                Subsidaries: [
                    {
                        SubsidaryId: '123',
                        Subsidary: 'subsidary',
                        Credit: 111,
                        Debit: 111,
                        EndingBalance: 222,
                        BeginningBalance: 100,
                    },
                    {
                        SubsidaryId: '1233',
                        Subsidary: 'subsidary',
                        Credit: 1111,
                        Debit: 1111,
                        EndingBalance: 2222,
                        BeginningBalance: 1000,
                    },
                ],
            },
        ];
        reportApi.getAccountSchedule('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });
    it('Should get cost of goods sold', () => {
        const response: CostOfGoodsSoldModel[] = [
            {
                Accounts: [
                    {
                        AccountName: 'account1',
                        Value: 100,
                    },
                    {
                        AccountName: 'accoun2',
                        Value: 1000,
                    },
                ],
                TotalProductionCost: 123,
                TotalProductionCostForAccount: 1234,
                WorkInProcessBegining: 111,
                WorkInProcessEnding: 222,
                FinishedGoodsBeginning: 112,
                CostOfAvailableGoods: 221,
            },
        ];
        reportApi.getCostOfGoodsSold('').subscribe((data: any) => {
            expect(data).toEqual(response);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        req.flush(response);

        httpMock.verify();
    });
});
