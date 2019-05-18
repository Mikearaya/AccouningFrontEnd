import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Checklist, SubsidaryLedgerViewMdel } from "./report";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReportApiService {
  private url = "report";
  constructor(private httpClient: HttpClient) {}

  getChecklistReport(): Observable<Checklist[]> {
    return this.httpClient.get<Checklist[]>(`${this.url}/ledger-checklists`);
  }

  getSubsidaryLedgerReport(): Observable<SubsidaryLedgerViewMdel[]> {
    return this.httpClient.get<SubsidaryLedgerViewMdel[]>(
      `${this.url}/subsidary-ledgers?year=2011`
    );
  }
}
