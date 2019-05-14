import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { AccountViewModel } from "../accounts/accounts";

import { catchError } from "rxjs/operators";
import {
  AccountTypeViewModel,
  AccountType,
  TypesIndexView,
  UpdateAccountType
} from "./account-type";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AccountTypeService {
  public url = "account-types";
  public indexUrl = "types-index";

  constructor(private httpClient: HttpClient) {}
  // Gets a single Account information by Id and returns an observable of Account
  getAccountTypeById(id: number): Observable<AccountTypeViewModel> {
    return this.httpClient.get<AccountTypeViewModel>(`${this.url}/${id}`);
  }

  getAccountTypes(
    searchString: string = ""
  ): Observable<AccountTypeViewModel[]> {
    return this.httpClient.get<AccountTypeViewModel[]>(
      `${this.url}?${searchString}`
    );
  }

  getTypesIndex(searchString: string = ""): Observable<TypesIndexView[]> {
    return this.httpClient.get<TypesIndexView[]>(
      `${this.indexUrl}?${searchString}`
    );
  }

  createAccountType(newAccountType: AccountType): Observable<AccountType> {
    return this.httpClient
      .post<AccountType>(`${this.url}`, newAccountType)
      .pipe(catchError(this.handleError));
  }

  updateAccountType(
    id: number,
    updatedAccountType: UpdateAccountType
  ): Observable<void> {
    updatedAccountType.Id = id;
    return this.httpClient
      .put<void>(`${this.url}/${updatedAccountType.Id}`, updatedAccountType)
      .pipe(catchError(this.handleError));
  }

  // deletes a single instance of Account record and returns boolean based on the outcome of the operation
  deleteAccountType(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}
