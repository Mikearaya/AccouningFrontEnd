/** @format */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import {
    AccountCatagoryView,
    AccountCategoryIndex,
    AccountCategory,
} from '../features/account-catagory/account-catagory-domain';
import {
    DataStateChangeEventArgs,
    Sorts,
    DataResult,
} from '@syncfusion/ej2-grids';
import { QueryString } from '../shared/data-view/data-view.model';
import { AccountingApiService } from '../Services/accounting-api.service';

@Injectable()
export class AccountCatagoryApiService extends Subject<
    DataStateChangeEventArgs
> {
    private url = 'account-categories';
    private query: QueryString;

    constructor(
        private httpClient: HttpClient,
        private accountingApi: AccountingApiService
    ) {
        super();
        this.query = new QueryString();
    }

    createAccountCatagory(
        newAccountCatag: AccountCategory
    ): Observable<AccountCatagoryView> {
        return this.httpClient
            .post<AccountCatagoryView>(`${this.url}`, newAccountCatag)
            .pipe(catchError(this.handleError));
    }

    getAccountCatagoryById(id: number): Observable<AccountCatagoryView> {
        return this.httpClient.get<AccountCatagoryView>(`${this.url}/${id}`);
    }

    getAccountCatagoryIndex(
        searchString: string = ''
    ): Observable<AccountCategoryIndex[]> {
        return this.httpClient.get<AccountCategoryIndex[]>(
            `account-categories/index?searchString=${searchString}`
        );
    }

    execute(state: DataStateChangeEventArgs): void {
        this.getData(state).subscribe((a) => this.next(a));
    }

    getData(
        state: DataStateChangeEventArgs
    ): Observable<DataStateChangeEventArgs> {
        if (state.action) {
            if (state.action.requestType === 'filtering') {
            }

            switch (state.action.requestType) {
                case 'sorting':
                    this.query.sortBy = state.action['columnName'];
                    this.query.sortDirection = state.action['direction'];
                    break;
                case 'filtering':
                    console.log(state.action);
                    this.query.filter = [];

                    state.action['columns'].forEach((element) => {
                        this.query.filter.push({
                            propertyName: element.field,
                            operation: element.operator,
                            value: element.value,
                        });
                    });

                    break;
                case 'searching':
                    this.query.searchString = state.action['searchString'];

                    break;
            }
        }

        this.query.year = this.accountingApi.getSelectedYear();
        this.query.pageSize = state.take;
        this.query.pageNumber = state.skip;

        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery = '';

        if ((state.sorted || []).length) {
            sortQuery =
                `&$orderby=` +
                state.sorted
                    .map((obj: Sorts) => {
                        return obj.direction === 'descending'
                            ? `${obj.name} desc`
                            : obj.name;
                    })
                    .reverse()
                    .join(',');
        }

        return this.httpClient
            .post(`${this.url}/filter`, this.query)
            .pipe(
                map(
                    (response: any) =>
                        ({
                            result: response['Items'],
                            count: parseInt(response['Count'], 10),
                        } as DataResult)
                )
            )
            .pipe((data: any) => data);
    }

    getAccountCatagories(
        searchString: string = ''
    ): Observable<AccountCatagoryView[]> {
        return this.httpClient.get<AccountCatagoryView[]>(
            `${this.url}?${searchString}`
        );
    }

    updateAccountCatagory(
        id: number,
        updatedAccountCatagory: AccountCategory
    ): Observable<void> {
        updatedAccountCatagory.Id = id;

        return this.httpClient.put<void>(
            `${this.url}/${id}`,
            updatedAccountCatagory
        );
    }

    deleteAccountCatagory(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.url}/${id}`);
    }

    private handleError(error: Response | any) {
        console.log(error);
        return of(error);
    }
}
