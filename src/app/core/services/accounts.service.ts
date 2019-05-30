/*
 * @CreateTime: Dec 8, 2018 11:37 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 8, 2019 12:13 PM
 * @Description: Modify Here, Please
 */
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import {
  Accounts,
  AccountsIndexView,
  AccountViewModel,
  AccountView
} from "../../features/accounts/accounts";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { QueryString } from "src/app/shared/data-view/data-view.model";

@Injectable()
export class AccountsService {
  public url = "accounts";
  private year: string;
  constructor(
    private httpClient: HttpClient,
    private accountingApi: AccountingApiService
  ) {
    this.year = this.accountingApi.getSelectedYear();
  }
  // Gets a single Account information by Id and returns an observable of Account
  getAccountById(id: number): Observable<AccountView> {
    return this.httpClient.get<AccountView>(`${this.url}/${id}`);
  }

  getAccountsList(queryString: QueryString): Observable<AccountViewModel> {
    
    queryString.year = this.accountingApi.getSelectedYear(); 
    return this.httpClient.post<AccountViewModel>(
      `${
        this.url
      }/filter?year=${this.accountingApi.getSelectedYear()}`,
        queryString
    );
  }

  getAccountIndex(searchString: string = ""): Observable<AccountsIndexView[]> {
    return this.httpClient.get<AccountsIndexView[]>(
      `${this.url}/index?searchString=${searchString}`
    );
  }

  // Creates a new instance of Account record in the system amd returns an observable
  // of the new Account information on success
  createAccount(newAccount: Accounts): Observable<Accounts> {
    return this.httpClient
      .post<Accounts>(`${this.url}`, newAccount)
      .pipe(catchError(this.handleError));
  }

  // Update a single instance of Account record and returns a boolean depending on the success or
  // failure of the operation
  updateAccount(id: number, updatedAccount: Accounts): Observable<void> {
    updatedAccount.Id = id;
    return this.httpClient
      .put<void>(`${this.url}/${updatedAccount.Id}`, updatedAccount)
      .pipe(catchError(this.handleError));
  }

  // deletes a single instance of Account record and returns boolean based on the outcome of the operation
  deleteAccount(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }


}
