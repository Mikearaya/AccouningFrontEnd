import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { catchError } from "rxjs/operators";
import {
  AccountCatagoryView,
  AccountCategoryIndex,
  AccountCategory
} from "../features/account-catagory/account-catagory-domain";

@Injectable()
export class AccountCatagoryApiService {
  private url = "account-categories";

  constructor(private httpClient: HttpClient) {}

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
    searchString: string
  ): Observable<AccountCategoryIndex[]> {
    return this.httpClient.get<AccountCategoryIndex[]>(
      `${this.url}/index?searchString=${searchString}`
    );
  }

  getAccountCatagories(
    searchString: string = ""
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
    alert("in");
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  private handleError(error: Response | any) {
    console.log(error);
    return of(error);
  }
}
