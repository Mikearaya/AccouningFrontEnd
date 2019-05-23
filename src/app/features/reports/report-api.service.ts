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
      `subsidary-ledgers?${searchString}`
    );
  }

  getTrialBalanceDetail(
    searchString: string
  ): Observable<TrialBalanceDetailViewModel[]> {
    return this.httpClient.get<TrialBalanceDetailViewModel[]>(
      `trial-balance-datail?${searchString}`
    );
  }

  getConsolidatedTrialBalance(
    searchString: string
  ): Observable<ConsolidatedTrialBalanceViewModel[]> {
    return this.httpClient.get<ConsolidatedTrialBalanceViewModel[]>(
      `consolidated-trial-balance?${searchString}`
    );
  }

  getBalanceSheet(searchString: string): Observable<BalanceSheetViewModel> {
    return this.httpClient.get<BalanceSheetViewModel>(
      `balance-sheet?${searchString}`
    );
  }

  getIncomeStatment(searchString: string): Observable<IncomeStatmentViewModel> {
    return this.httpClient.get<IncomeStatmentViewModel>(
      `income-statement?${searchString}`
    );
  }
}
