/** @format */

import { TestBed } from '@angular/core/testing';

import { SubsidaryLedgerApiService } from './subsidary-ledger-api.service';
import { HttpClient } from '@angular/common/http';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('SubsidaryLedgerApiService', () => {
    let httpClient: HttpClient;
    let accountingApiService: AccountingApiService;
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SubsidaryLedgerApiService = new SubsidaryLedgerApiService(
            httpClient,
            accountingApiService
        );
        expect(service).toBeTruthy();
    });
});
