/*
 * @CreateTime: Dec 8, 2018 11:37 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: Apr 25, 2019 5:38 PM
 * @Description: Modify Here, Please
 */
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import {
  Accounts,
  AccountsIndexView,
  AccountViewModel
} from "../../features/accounts/accounts";

@Injectable()
export class AccountsService {
  public url = "accounts";

  constructor(private httpClient: HttpClient) {}
  // Gets a single Account information by Id and returns an observable of Account
  getAccountById(id: number): Observable<AccountViewModel> {
    return this.httpClient.get<AccountViewModel>(`${this.url}/${id}`);
  }

  // Gets all the record of Account and returns and observable of Account object
  // getAccountsList(
  //   query: string = "selectedColumns=Id,AccountCode,AccountName,ParentAccount"
  // ): Observable<Accounts[]> {
  //   return of(this.accounts);
  // }

  getAccountsList(searchString: string = ""): Observable<AccountViewModel[]> {
    return this.httpClient.get<AccountViewModel[]>(
      `${this.url}?${searchString}`
    );
  }

  getAccountIndex(searchString: string = ""): Observable<AccountsIndexView[]> {
    return this.httpClient.get<AccountsIndexView[]>(
      `parent-accounts/${searchString}`
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
