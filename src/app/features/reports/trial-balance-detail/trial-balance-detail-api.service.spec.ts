/** @format */

import { TestBed } from '@angular/core/testing';

import { TrialBalanceDetailApiService } from './trial-balance-detail-api.service';
import { HttpClient } from '@angular/common/http';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('TrialBalanceDetailApiService', () => {
    const httpClient: HttpClient = null;
    const accountingApiService: AccountingApiService = null;
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TrialBalanceDetailApiService = new TrialBalanceDetailApiService(
            httpClient,
            accountingApiService
        );
        expect(service).toBeTruthy();
    });
});
