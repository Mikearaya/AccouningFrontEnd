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
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Accounts, AccountBalanceView } from "./accounts";

@Injectable()
export class AccountsService {
  public url = "http://localhost:3000/accounts";

  constructor(private httpClient: HttpClient) {}
  // Gets a single Account information by Id and returns an observable of Account
  getAccountById(id: string): Observable<Accounts> {
    return this.httpClient.get<Accounts>(`${this.url}/${id}`);
  }

  // Gets all the record of Account and returns and observable of Account object
  // getAccountsList(
  //   query: string = "selectedColumns=Id,AccountCode,AccountName,ParentAccount"
  // ): Observable<Accounts[]> {
  //   return of(this.accounts);
  // }

  getAccountsList(searchString: string = ""): Observable<Accounts[]> {
    return this.httpClient.get<Accounts[]>(`${this.url}`);
  }

  getAccountBalance(Id: string): Observable<AccountBalanceView> {
    return this.httpClient.get<AccountBalanceView>(
      `${this.url}/${Id}?type=balance`
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
  updateAccount(id: string, updatedAccount: Accounts): Observable<boolean> {
    updatedAccount.Id = id;
    return this.httpClient
      .put<boolean>(`${this.url}/${id}`, updatedAccount)
      .pipe(catchError(this.handleError));
  }

  // deletes a single instance of Account record and returns boolean based on the outcome of the operation
  deleteAccount(id: string): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}
