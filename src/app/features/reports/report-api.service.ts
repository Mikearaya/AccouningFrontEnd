import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Checklist,
  SubsidaryLedgerViewMdel,
  LedgerChecklistView
} from "./report";
import { Observable } from "rxjs";

@Injectable()
export class ReportApiService {
  private url = "report";
  constructor(private httpClient: HttpClient) {}

  getChecklistReport(searchString: string): Observable<LedgerChecklistView> {
    return this.httpClient.get<LedgerChecklistView>(
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
