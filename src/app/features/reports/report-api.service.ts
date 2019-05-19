import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Checklist, SubsidaryLedgerViewMdel } from "./report";
import { Observable } from "rxjs";

@Injectable()
export class ReportApiService {
  private url = "report";
  constructor(private httpClient: HttpClient) {}

  getChecklistReport(searchString: string): Observable<Checklist[]> {
    return this.httpClient.get<Checklist[]>(
      `${this.url}/ledger-checklists?${searchString}`
    );
  }

  getSubsidaryLedgerReport(
    searchString: string
  ): Observable<SubsidaryLedgerViewMdel[]> {
    return this.httpClient.get<SubsidaryLedgerViewMdel[]>(
      `${this.url}/subsidary-ledgers?year=2011;${searchString}`
    );
  }
}
