import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { catchError } from "rxjs/operators";
import { AccountCatagories } from "../features/account-catagory/account-catagory-domain";

@Injectable({
  providedIn: "root"
})
export class AccountCatagoryApiService {
  private url = "account-categories";

  constructor(private httpClient: HttpClient) {}

  createAccountCatagory(
    newAccountCatag: AccountCatagories
  ): Observable<AccountCatagories> {
    return this.httpClient
      .post<AccountCatagories>(`${this.url}`, newAccountCatag)
      .pipe(catchError(this.handleError));
  }

  getAccountCatagoryById(id: number): Observable<AccountCatagories> {
    return this.httpClient.get<AccountCatagories>(`${this.url}/${id}`);
  }

  getAccountCatagoryIndex(searchString: string): Observable<AccountCatagories> {
    return this.httpClient.get<AccountCatagories>(
      `${this.url}/index?searchString=${searchString}`
    );
  }

  getAccountCatagories(): Observable<AccountCatagories[]> {
    return this.httpClient.get<AccountCatagories[]>(`${this.url}`);
  }

  updateAccountCatagory(
    id: number,
    updatedAccountCatagory: AccountCatagories
  ): Observable<boolean> {
    updatedAccountCatagory.Id = id;
    return this.httpClient
      .put<boolean>(`${this.url}/${id}`, updatedAccountCatagory)
      .pipe(catchError(this.handleError));
  }

  deleteAccountCatagory(id: number): Observable<boolean> {
    if (id) {
      return this.httpClient
        .delete<boolean>(`${this.url}/${id}`)
        .pipe(catchError(this.handleError));
    }
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}
