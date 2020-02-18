/** @format */

import {
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccountTypeService } from './account-type.service';
import {
    AccountTypeViewModel,
    AccountType,
    UpdateAccountType,
} from '../../features/account-type/account-type';
import { CoreModule } from 'src/app/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('Account type service', () => {
    let typeApi: AccountTypeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
            providers: [AccountTypeService, AccountingApiService],
        });

        // inject the service
        typeApi = TestBed.get(AccountTypeService);
        httpMock = TestBed.get(HttpTestingController);
    });
    // expecting the correct(but faked) result: propery 'Name' with value 'Account1'
    it('Should get account type successfull', () => {
        const returnedSingleType: AccountTypeViewModel = {
            Id: 1,
            Type: 'Account1',
            AccountType: 'Asset',
            TypeOfId: 1,
            IsSummary: true,
            AccountTypeId: 11,
        };

        typeApi.getAccountTypeById(1).subscribe((data: any) => {
            expect(data).toEqual(returnedSingleType);
        });
        // telling the httmock what kind of request we expect and toward which url
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('GET');

        // fire the request with its data we really expect

        req.flush(returnedSingleType);

        httpMock.verify();
    });
    it('Should get all account types successfull', () => {
        const returnedTypes: AccountTypeViewModel[] = [
            {
                Id: 1,
                Type: 'Account1',
                AccountType: 'Asset',
                TypeOfId: 1,
                IsSummary: true,
                AccountTypeId: 11,
            },
            {
                Id: 2,
                Type: 'Account2',
                AccountType: 'Expence',
                TypeOfId: 3,
                IsSummary: true,
                AccountTypeId: 11,
            },
        ];
        typeApi.getAccountTypes().subscribe((data: any) => {
            expect(data).toEqual(returnedTypes);
        });
        // telling the httmock what kind of request we expect and toward which url
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });

        // fire the request with its data we really expect

        req.flush(returnedTypes);

        httpMock.verify();
    });
    it('Should create account type', () => {
        const newType: AccountType = {
            Type: 'Account1',
            IsTypeOf: 1,
            IsSummary: true,
        };
        typeApi.createAccountType(newType).subscribe((data: any) => {
            expect(data.Type).toBe('Account1');
            expect(data.IsTypeOf).toBe(1);
            expect(data.IsSummary).toBe(true);
        });
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('POST');
        req.flush(newType);
        httpMock.verify();
    });
    it('Should update account type', () => {
        const updatedType: UpdateAccountType = {
            Id: 1,
            Type: 'Account1',
            IsTypeOf: 1,
            IsSummary: true,
        };
        typeApi
            .updateAccountType(updatedType.Id, updatedType)
            .subscribe((data: any) => {
                expect(data.Id).toBe(1);
                expect(data.Type).toBe('Account1');
                expect(data.IsTypeOf).toBe(1);
                expect(data.IsSummary).toBe(true);
            });
        const req = httpMock.expectOne((request) => {
            console.log('url: ', request.url);
            return true;
        });
        expect(req.request.method).toBe('PUT');

        req.flush(updatedType);

        httpMock.verify();
    });
    it('Should delete account type', () => {
        typeApi.deleteAccountType(2).subscribe((data: any) => {
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
