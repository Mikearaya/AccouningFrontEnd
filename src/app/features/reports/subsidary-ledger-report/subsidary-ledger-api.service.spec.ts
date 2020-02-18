/** @format */

import { TestBed } from '@angular/core/testing';

import { SubsidaryLedgerApiService } from './subsidary-ledger-api.service';
import { HttpClient } from '@angular/common/http';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('SubsidaryLedgerApiService', () => {
    const httpClient: HttpClient = null;
    const accountingApiService: AccountingApiService = null;
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SubsidaryLedgerApiService = new SubsidaryLedgerApiService(
            httpClient,
            accountingApiService
        );
        expect(service).toBeTruthy();
    });
});
