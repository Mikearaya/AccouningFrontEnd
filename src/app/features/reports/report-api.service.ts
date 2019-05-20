import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  Checklist,
  SubsidaryLedgerViewModel,
  TrialBalanceDetailViewModel,
  ConsolidatedTrialBalanceViewModel
} from "./report";

@Injectable()
export class ReportApiService {
  private url = "report";
  constructor(private httpClient: HttpClient) {}

  getChecklistReport(searchString: string): Observable<Checklist[]> {
    return this.httpClient.get<Checklist[]>(
      `ledger-checklists?${searchString}`
    );
  }

  getSubsidaryLedgerReport(
    searchString: string
  ): Observable<SubsidaryLedgerViewModel[]> {
    return this.httpClient.get<SubsidaryLedgerViewModel[]>(
      `subsidaries?${searchString}`
    );
  }

  getTrialBalanceDetail(
    searchString: string
  ): Observable<TrialBalanceDetailViewModel[]> {
    return this.httpClient.get<TrialBalanceDetailViewModel[]>(
      `trial-balance-detail?${searchString}`
    );
  }

  getConsolidatedTrialBalance(
    searchString: string
  ): Observable<ConsolidatedTrialBalanceViewModel[]> {
    return this.httpClient.get<ConsolidatedTrialBalanceViewModel[]>(
      `consolidated-trial-balance?${searchString}`
    );
  }
}
