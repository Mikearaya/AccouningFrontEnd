import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  Lookup,
  LookupView,
  LookupsIndexView,
  SystemLookupCategoriesView
} from "../../features/lookups/lookups";
import {
  DataStateChangeEventArgs,
  Sorts,
  DataResult
} from "@syncfusion/ej2-grids";
import { QueryString } from "src/app/shared/data-view/data-view.model";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

@Injectable()
export class LookupService extends Subject<DataStateChangeEventArgs> {
  private url = "system-lookups";
  private query = new QueryString();

  constructor(
    private httpClient: HttpClient,
    private accountingService: AccountingApiService
  ) {
    super();
  }

  createLookup(newLookup: Lookup): Observable<LookupView> {
    return this.httpClient
      .post<LookupView>(`${this.url}`, newLookup)
      .pipe(catchError(this.handleError));
  }

  getLookupId(id: number): Observable<LookupView> {
    return this.httpClient.get<LookupView>(`${this.url}/${id}`);
  }

  getLookupIndex(searchString: string = ""): Observable<LookupsIndexView[]> {
    return this.httpClient.get<LookupsIndexView[]>(
      `${this.url}?type=cost center${searchString}`
    );
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

    this.query.year = this.accountingService.getSelectedYear();
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

  getLookups(searchString: string = ""): Observable<LookupView[]> {
    return this.httpClient.get<LookupView[]>(`${this.url}?${searchString}`);
  }

  getLookUpType(type: string): Observable<LookupsIndexView[]> {
    return this.httpClient.get<LookupsIndexView[]>(
      `${this.url}/type?type=${type}`
    );
  }

  getSystemLookupCategories(): Observable<SystemLookupCategoriesView[]> {
    return this.httpClient.get<SystemLookupCategoriesView[]>(
      `${this.url}/categories`
    );
  }

  updateLookup(updatedLookup: Lookup): Observable<void> {
    return this.httpClient.put<void>(`${this.url}`, updatedLookup);
  }

  deleteLookup(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  private handleError(error: Response | any) {
    console.log(error);
    return of(error);
  }
}
