/*
 * @CreateTime: Dec 11, 2018 9:36 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 8, 2019 5:50 PM
 * @Description: Modify Here, Please
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import {
  JornalEntryViewModel,
  LedgerEntryViewModel,
  UpdateLedgerStatus,
  LedgerEntry,
  LedgerEntryIndexView
} from "../../features/ledgers/ledger";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import {
  DataStateChangeEventArgs,
  Sorts,
  DataResult
} from "@syncfusion/ej2-grids";
import { QueryString } from "src/app/shared/data-view/data-view.model";
import { map } from "rxjs/operators";

@Injectable()
export class LedgerService extends Subject<DataStateChangeEventArgs> {
  private url = "ledgers";
  private query = new QueryString();
  constructor(
    private httpClient: HttpClient,
    private accountingApi: AccountingApiService
  ) {
    super();
  }

  getAllLedgerEntries(query: string = ""): Observable<LedgerEntryViewModel[]> {
    return this.httpClient.get<LedgerEntryViewModel[]>(
      `${this.url}?year=${this.accountingApi.getSelectedYear()}${query}`
    );
  }

  getLedgerEntryById(id: number): Observable<JornalEntryViewModel> {
    return this.httpClient.get<JornalEntryViewModel>(`${this.url}/${id}`);
  }

  getLedgerEntryByVoucherId(id: string): Observable<LedgerEntryIndexView> {
    return this.httpClient.get<LedgerEntryIndexView>(
      `${this.url}/voucher/${id}`
    );
  }

  addLedgerEntry(newLedger: LedgerEntry): Observable<LedgerEntryViewModel> {
    return this.httpClient.post<LedgerEntryViewModel>(`${this.url}`, newLedger);
  }

  updateLedgerEntry(
    id: number,
    updatedLedger: LedgerEntry
  ): Observable<boolean> {
    updatedLedger.Id = id;
    return this.httpClient.put<boolean>(
      `${this.url}/${updatedLedger.Id}`,
      updatedLedger
    );
  }

  updateLedgerStatus(
    id: number,
    updatedLedgerStatus: UpdateLedgerStatus
  ): Observable<boolean> {
    updatedLedgerStatus.Id = id;
    return this.httpClient.put<boolean>(
      `${this.url}/status/${updatedLedgerStatus.Id}`,
      updatedLedgerStatus
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

  public executeUnpostedEntries(state: any): void {
    this.getUnpostedEntries(state).subscribe(x =>
      super.next(x as DataStateChangeEventArgs)
    );
  }

  getUnpostedEntries(
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
      .post(`${this.url}/unposted`, this.query)
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

  deleteLedgerEntry(deletedLedgerId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${deletedLedgerId}`);
  }
}
