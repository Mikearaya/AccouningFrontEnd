import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  LedgerChecklistView,
  SubsidaryLedgerViewModel,
  TrialBalanceDetailViewModel,
  ConsolidatedTrialBalanceViewModel,
  BalanceSheetViewModel,
  IncomeStatmentViewModel
} from "./report";
import { Observable } from "rxjs";

@Injectable()
export class ReportApiService {
  private url = "report";
  constructor(private httpClient: HttpClient) {}

  getChecklistReport(searchString: string): Observable<LedgerChecklistView> {
    return this.httpClient.get<LedgerChecklistView>(
      `ledger-checklists?${searchString}`
    );
  }

  getSubsidaryLedgerReport(
    searchString: string
  ): Observable<SubsidaryLedgerViewModel[]> {
    return this.httpClient.get<SubsidaryLedgerViewModel[]>(
      `${this.url}/subsidary-ledgers?Year=2011&${searchString}`
    );
  }

  getTrialBalanceDetail(
    searchString: string
  ): Observable<TrialBalanceDetailViewModel[]> {
    return this.httpClient.get<TrialBalanceDetailViewModel[]>(
      `${this.url}/trial-balance/detail?Year=2011&${searchString}`
    );
  }

  getConsolidatedTrialBalance(
    searchString: string
  ): Observable<ConsolidatedTrialBalanceViewModel[]> {
    return this.httpClient.get<ConsolidatedTrialBalanceViewModel[]>(
      `${this.url}/trial-balance/consolidated?Year=2011&${searchString}`
    );
  }

  getBalanceSheet(searchString: string): Observable<BalanceSheetViewModel> {
    return this.httpClient.get<BalanceSheetViewModel>(
      `${this.url}/balance-sheet?year=2011&${searchString}`
    );
  }

  getIncomeStatment(searchString: string): Observable<IncomeStatmentViewModel> {
    return this.httpClient.get<IncomeStatmentViewModel>(
      `${this.url}/income-statement?year=2011&${searchString}`
    );
  }
}
