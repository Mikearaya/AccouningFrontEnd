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

  getAccountCatagoryById(id: number): Observable<AccountCatagory> {
    return this.httpClient.get<AccountCatagory>(`${this.url}/${id}`);
  }

  getAccountCatagoryIndex(index: number): Observable<AccountCatagory> {
    return this.httpClient.get<AccountCatagory>(`${this.url}/${index}`);
  }

  getAccountCatagories(): Observable<AccountCatagory[]> {
    return this.httpClient.get<AccountCatagory[]>(`${this.url}`);
  }

  updateAccountCatagory(
    id: number,
    updatedAccountCatagory: AccountCatagory
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
