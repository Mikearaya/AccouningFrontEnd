/** @format */

import { TestBed } from '@angular/core/testing';

import { ConsolidatedTrialBalanceApiService } from './consolidated-trial-balance-api.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';
import { HttpClient } from '@angular/common/http';

describe('ConsolidatedTrialBalanceApiService', () => {
    const httpClient: HttpClient = null;
    const accountingApiService: AccountingApiService = null;
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ConsolidatedTrialBalanceApiService = new ConsolidatedTrialBalanceApiService(
            httpClient,
            accountingApiService
        );
        expect(service).toBeTruthy();
    });
});
