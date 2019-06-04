import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import {
  DataStateChangeEventArgs,
  DataResult,
  Sorts
} from "@syncfusion/ej2-grids";
import { ReportFilterModel } from "src/app/shared/filter-option/filter";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { HttpClient } from "@angular/common/http";
import { QueryString } from "src/app/shared/data-view/data-view.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AccountsScheduleApiService extends Subject<
  DataStateChangeEventArgs
> {
  private query = new QueryString();

  constructor(
    private httpClient: HttpClient,
    private accountingApi: AccountingApiService
  ) {
    super();
  }

  execute(state: DataStateChangeEventArgs, filter: ReportFilterModel): void {
    this.getData(state, filter).subscribe(a => this.next(a));
  }

  getData(
    state: DataStateChangeEventArgs,
    filter: ReportFilterModel
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

    filter.sortBy = this.query.sortBy;
    filter.sortDirection = this.query.sortDirection;
    filter.pageNumber = this.query.pageNumber;
    filter.pageSize = this.query.pageSize;
    filter.year = this.query.year;
    filter.filter = this.query.filter;

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
      .post(`report/schedule`, filter)
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
}
