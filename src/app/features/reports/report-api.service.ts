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
import { AccountingApiService } from "src/app/Services/accounting-api.service";

@Injectable()
export class ReportApiService {
  private url = "report";
  constructor(
    private httpClient: HttpClient,
    private accountingService: AccountingApiService
  ) {}

  getChecklistReport(searchString: string): Observable<LedgerChecklistView> {
    return this.httpClient.get<LedgerChecklistView>(
      `${this.url}/ledger-checklists?year=2019${searchString}`
    );
  }

  getSubsidaryLedgerReport(
    searchString: string
  ): Observable<SubsidaryLedgerViewModel[]> {
    return this.httpClient.get<SubsidaryLedgerViewModel[]>(
      `${
        this.url
      }/subsidary-ledgers?year=${this.accountingService.getSelectedYear()}&${searchString}`
    );
  }

  getTrialBalanceDetail(
    searchString: string
  ): Observable<TrialBalanceDetailViewModel[]> {
    return this.httpClient.get<TrialBalanceDetailViewModel[]>(
      `${
        this.url
      }/trial-balance/detail?year=${this.accountingService.getSelectedYear()}&${searchString}`
    );
  }

  getConsolidatedTrialBalance(
    searchString: string
  ): Observable<ConsolidatedTrialBalanceViewModel[]> {
    return this.httpClient.get<ConsolidatedTrialBalanceViewModel[]>(
      `${
        this.url
      }/trial-balance/consolidated?year=${this.accountingService.getSelectedYear()}&${searchString}`
    );
  }

  getBalanceSheet(searchString: string): Observable<BalanceSheetViewModel> {
    return this.httpClient.get<BalanceSheetViewModel>(
      `${
        this.url
      }/balance-sheet?year=${this.accountingService.getSelectedYear()}&${searchString}`
    );
  }

  getIncomeStatment(searchString: string): Observable<IncomeStatmentViewModel> {
    return this.httpClient.get<IncomeStatmentViewModel>(
      `${
        this.url
      }/income-statement?year=${this.accountingService.getSelectedYear()}&${searchString}`
    );
  }
}
