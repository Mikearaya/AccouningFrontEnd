import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountCatagory } from "./account-catagory-domain";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AccountCatagoryApiService {
  private url = " http://localhost:3000/account-catagory";

  constructor(private httpClient: HttpClient) {}

  createAccountCatagory(
    newAccountCatag: AccountCatagory
  ): Observable<AccountCatagory> {
    return this.httpClient
      .post<AccountCatagory>(`${this.url}`, newAccountCatag)
      .pipe(catchError(this.handleError));
  }

  getAccountCatagories(): Observable<AccountCatagory[]> {
    return this.httpClient.get<AccountCatagory[]>(`${this.url}`);
  }

  updateAccountCatagory(
    id: string,
    updatedAccountCatagory: AccountCatagory
  ): Observable<boolean> {
    return this.httpClient
      .put<boolean>(`${this.url}/${id}`, updatedAccountCatagory)
      .pipe(catchError(this.handleError));
  }

  deleteAccountCatagory(id: string): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}
