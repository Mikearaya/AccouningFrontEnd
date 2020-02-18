/** @format */

import {
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccountCatagoryApiService } from './account-catagory-api.service';
import { AccountCategory } from '../features/account-catagory/account-catagory-domain';
import { Accounts } from '../features/accounts/accounts';
import { CoreModule } from './core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountingApiService } from '../Services/accounting-api.service';

describe('Account catagories service', () => {
    let catagoryApi: AccountCatagoryApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
            providers: [AccountCatagoryApiService, AccountingApiService],
        });

        // inject the service
        catagoryApi = TestBed.get(AccountCatagoryApiService);
        httpMock = TestBed.get(HttpTestingController);
    });
    // expecting the correct(but faked) result: propery 'Name' with value 'Account1'
    it('Should get catagory successfull', () => {
        const returnedSingleCatagory: AccountCategory = {
            Id: 1,
            AccountType: 'Asset',
            CatagoryName: 'Catag1',
        };

        catagoryApi.getAccountCatagoryById(1).subscribe((data: any) => {
            expect(data.Id).toBe(1);
            expect(data.AccountType).toBe('Asset');
            expect(data.CatagoryName).toBe('Catag1');
        });
        // telling the httmock what kind of request we expect and toward which url
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        // fire the request with its data we really expect

        req.flush(returnedSingleCatagory);

        httpMock.verify();
    });
    it('Should get all catagories successfull', () => {
        const returnedCatagories: AccountCategory[] = [
            {
                Id: 1,
                AccountType: 'Asset',
                CatagoryName: 'Catag1',
            },
            {
                Id: 2,
                AccountType: 'Expence',
                CatagoryName: 'Catag2',
            },
        ];
        catagoryApi.getAccountCatagories().subscribe((data: any) => {
            expect(data).toEqual(returnedCatagories);
        });
        // telling the httmock what kind of request we expect and toward which url
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        // fire the request with its data we really expect

        req.flush(returnedCatagories);

        httpMock.verify();
    });
    it('Should create catagory', () => {
        const newCatagory: AccountCategory = {
            Id: 2,
            AccountType: 'Expence',
            CatagoryName: 'Catag2',
        };
        catagoryApi
            .createAccountCatagory(newCatagory)
            .subscribe((data: any) => {
                expect(data.Id).toBe(2);
                expect(data.AccountType).toBe('Expence');
                expect(data.CatagoryName).toBe('Catag2');
            });
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('POST');
        req.flush(newCatagory);
        httpMock.verify();
    });
    it('Should update catagory', () => {
        const updatedCatagory: AccountCategory = {
            Id: 2,
            AccountType: 'Expence',
            CatagoryName: 'Catag2',
        };
        catagoryApi
            .updateAccountCatagory(updatedCatagory.Id, updatedCatagory)
            .subscribe((data: any) => {
                expect(data.Id).toBe(2);
                expect(data.AccountType).toBe('Expence');
                expect(data.CatagoryName).toBe('Catag2');
            });
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('PUT');

        req.flush(updatedCatagory);

        httpMock.verify();
    });
    it('Should delete catagory', () => {
        catagoryApi.deleteAccountCatagory(2).subscribe((data: any) => {
            expect(data).toBe(2);
        });

        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('DELETE');

        req.flush(2);

        httpMock.verify();
    });
});
