/** @format */

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SecurityService {
    securityObject: AppUserAuth;
    x = {
        bearerToken: 'asdfghjjklyyrrffghjjj',
        isAuthenticated: true,
        claims: [
            { claimType: 'canViewAccount', claimValue: 'true' },
            { claimType: 'canAddNewAccount', claimValue: 'true' },
            { claimType: 'canEditAccount', claimValue: 'true' },
            { claimType: 'canDeleteAccount', claimValue: 'true' },
            { claimType: 'canViewAccountCategory', claimValue: 'true' },
            { claimType: 'canAddNewAccountCategory', claimValue: 'true' },
            { claimType: 'canEditAccountCategory', claimValue: 'true' },
            { claimType: 'canDeleteAccountCategory', claimValue: 'true' },
            { claimType: 'canViewAccountType', claimValue: 'true' },
            { claimType: 'canAddNewAccountType', claimValue: 'true' },
            { claimType: 'canEditAccountType', claimValue: 'true' },
            { claimType: 'canDeleteAccountType', claimValue: 'true' },
            { claimType: 'canCreateNewYear', claimValue: 'true' },
            { claimType: 'canViewLedgerEntry', claimValue: 'true' },
            { claimType: 'canAddNewLedgerEntry', claimValue: 'true' },
            { claimType: 'canEditLedgerEntry', claimValue: 'true' },
            { claimType: 'canDeleteLedgerEntry', claimValue: 'true' },
            { claimType: 'canViewLookups', claimValue: 'true' },
            { claimType: 'canAddNewLookups', claimValue: 'true' },
            { claimType: 'canEditLookups', claimValue: 'true' },
            { claimType: 'canDeleteLookups', claimValue: 'true' },
            { claimType: 'canViewBalanceSheet', claimValue: 'true' },
            { claimType: 'canViewIncomeStatement', claimValue: 'true' },
            { claimType: 'canViewAccountSchedule', claimValue: 'true' },
            { claimType: 'canViewAccountChecklist', claimValue: 'true' },
            {
                claimType: 'canViewConsolidatedTrialBalance',
                claimValue: 'true',
            },
            { claimType: 'canViewSubsidaryLedger', claimValue: 'true' },
            { claimType: 'canViewTrialBalanceDetail', claimValue: 'true' },
            {
                claimType: 'canViewCostOfGoodsSold',
                claimValue: 'true',
            },
        ],
        userName: 'Admin',
    };
    constructor(private httpClient: HttpClient) {
        this.securityObject = new AppUserAuth();
        // localStorage.setItem("accountingBearerToken", JSON.stringify(this.x));

        if (localStorage.getItem('accountingBearerToken')) {
            this.securityObject = JSON.parse(
                localStorage.getItem('accountingBearerToken')
            );
        }
    }

    logIn(): Observable<AppUserAuth> {
        if (!this.securityObject.isAuthenticated && true) {
            this.httpClient
                .get<AppUserAuth>(
                    `http://${window.location.hostname}/smarthrm/authenticate/my_role/finance`
                )
                .subscribe(
                    (data: AppUserAuth) => (this.securityObject = data),
                    (error: HttpErrorResponse) =>
                        (window.location.href = `http://${window.location.hostname}/smarthrm/authenticate/logout`)
                );
        }
        localStorage.setItem('accountingBearerToken', JSON.stringify(this.x));

        return of<AppUserAuth>(this.x);
    }

    resetSecurityObject(): void {
        this.securityObject.userName = '';
        this.securityObject.bearerToken = '';
        this.securityObject.claims = [];
        this.securityObject.isAuthenticated = false;

        localStorage.removeItem('accountingBearerToken');
    }

    logOut() {
        this.resetSecurityObject();
        window.location.href = `http://${window.location.hostname}/smarthrm/authenticate/logout`;
    }

    hasClaim(claimType: any, claimValue?: any): boolean {
        let ret = false;
        if (typeof claimType === 'string') {
            ret = this.isClaimValid(claimType, claimValue);
        } else {
            const claims: string[] = claimType;

            if (claims) {
                for (const iterator of claims) {
                    ret = this.isClaimValid(iterator);
                    if (ret) {
                        break;
                    }
                }
            }
        }

        return ret;
    }

    private isClaimValid(claimType: string, claimValue?: string): boolean {
        let ret = false;
        let auth: AppUserAuth = null;

        auth = this.securityObject;

        if (auth) {
            if (claimType.indexOf(':') >= 0) {
                const words: string[] = claimType.split(':');
                claimType = words[0].toLocaleLowerCase();
                claimValue = words[1];
            } else {
                claimType = claimType.toLocaleLowerCase();
                claimValue = claimValue ? claimValue : 'true';
            }

            const s = auth.claims.find(
                (c) =>
                    c.claimType.toLocaleLowerCase() === claimType &&
                    c.claimValue === claimValue
            );

            ret =
                auth.claims.find(
                    (c) =>
                        c.claimType.toLocaleLowerCase() === claimType &&
                        c.claimValue === claimValue
                ) != null;
        }

        return ret;
    }
}

export class AppUserAuth {
    userName = '';
    bearerToken = '';
    isAuthenticated = false;
    claims: ClaimModel[] = [];
}

export interface ClaimModel {
    claimType: string;
    claimValue: string;
}

export class AppUser {
    userName = '';
    password = '';
}
