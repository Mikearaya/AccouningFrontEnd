/*
 * @CreateTime: Dec 8, 2018 11:37 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 8, 2019 12:13 PM
 * @Description: Modify Here, Please
 */
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import {
  Accounts,
  AccountsIndexView,
  AccountViewModel,
  AccountView
} from "../../features/accounts/accounts";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { QueryString } from "src/app/shared/data-view/data-view.model";
import {
  DataStateChangeEventArgs,
  Sorts,
  DataResult
} from "@syncfusion/ej2-grids";

@Injectable()
export class AccountsService extends Subject<DataStateChangeEventArgs> {
  public url = "accounts";
  private year: string;
  private query = new QueryString();

  constructor(
    private httpClient: HttpClient,
    private accountingApi: AccountingApiService
  ) {
    super();
    this.year = this.accountingApi.getSelectedYear();
  }
  // Gets a single Account information by Id and returns an observable of Account
  getAccountById(id: number): Observable<AccountView> {
    return this.httpClient.get<AccountView>(`${this.url}/${id}`);
  }

  getAccountsList(queryString: QueryString): Observable<AccountViewModel> {
    queryString.year = this.accountingApi.getSelectedYear();
    return this.httpClient.post<AccountViewModel>(
      `${this.url}/filter?year=${this.accountingApi.getSelectedYear()}`,
      queryString
    );
  }

  getAccountsListAutoComplete(
    queryString: QueryString
  ): Observable<AccountViewModel> {
    queryString.year = "";
    return this.httpClient.post<AccountViewModel>(
      `${this.url}/year=${queryString.year}`,
      queryString
    );
  }

  getAccountIndex(searchString: string = ""): Observable<AccountsIndexView[]> {
    return this.httpClient.get<AccountsIndexView[]>(
      `${this.url}/index?searchString=${searchString}&year=${this.year}`
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

  public execute(state: any): void {
    this.getData(state).subscribe(x =>
      super.next(x as DataStateChangeEventArgs)
    );
  }

  getData(
    state: DataStateChangeEventArgs
  ): Observable<DataStateChangeEventArgs> {
    if (state.action) {
      if (state.action.requestType === "filtering") {
      }

      switch (state.action.requestType) {
        case "sorting":
          this.query.sortBy = state.action["columnName"];
          this.query.sortDirection = state.action["direction"];
          break;
        case "filtering":
          console.log(state.action);
          this.query.filter = [];

          state.action["columns"].forEach(element => {
            this.query.filter.push({
              propertyName: element.field,
              operation: element.operator,
              value: element.value
            });
          });

          break;
        case "searching":
          this.query.searchString = state.action["searchString"];

          break;
      }
    }

    this.query.year = this.accountingApi.getSelectedYear();
    this.query.pageSize = state.take;
    this.query.pageNumber = state.skip;

    const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
    let sortQuery = "";

    if ((state.sorted || []).length) {
      sortQuery =
        `&$orderby=` +
        state.sorted
          .map((obj: Sorts) => {
            return obj.direction === "descending"
              ? `${obj.name} desc`
              : obj.name;
          })
          .reverse()
          .join(",");
    }

    return this.httpClient
      .post(`${this.url}/filter`, this.query)
      .pipe(
        map(
          (response: any) =>
            ({
              result: response["Items"],
              count: parseInt(response["Count"], 10)
            } as DataResult)
        )
      )
      .pipe((data: any) => data);
  }
  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}
