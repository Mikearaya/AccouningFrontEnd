import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  AccountTypeViewModel,
  AccountType,
  TypesIndexView,
  UpdateAccountType
} from "../../features/account-type/account-type";
import { HttpClient } from "@angular/common/http";
import { QueryString } from "src/app/shared/data-view/data-view.model";
import {
  DataStateChangeEventArgs,
  Sorts,
  DataResult
} from "@syncfusion/ej2-grids";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

@Injectable()
export class AccountTypeService extends Subject<DataStateChangeEventArgs> {
  public url = "account-types";
  public indexUrl = "account-types/index";
  private query = new QueryString();

  constructor(
    private httpClient: HttpClient,
    private accountingApi: AccountingApiService
  ) {
    super();
  }
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

  execute(state: DataStateChangeEventArgs): void {
    this.getData(state).subscribe(a => this.next(a));
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
