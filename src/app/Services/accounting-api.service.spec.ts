/** @format */

import { TestBed } from '@angular/core/testing';

import { AccountingApiService } from './accounting-api.service';
import { HttpClient } from '@angular/common/http';

describe('AccountingApiService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [AccountingApiService],
        })
    );

    it('should be created', () => {});
});
