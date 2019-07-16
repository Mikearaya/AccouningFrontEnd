import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AvailableYearsModel, DashboardViewModel } from "./system-data.model";
import { Observable } from "rxjs";

@Injectable()
export class AccountingApiService {
  private selectedYear = "";

  constructor(private httpClient: HttpClient) {}

  getAvailableYears(): Observable<AvailableYearsModel[]> {
    return this.httpClient.get<AvailableYearsModel[]>(`system-lookups/years`);
  }

  setSelectedYear(newYear: string): void {
    this.selectedYear = newYear;
  }
  getSelectedYear(): string {
    return this.selectedYear;
  }

  createNextFiscalPeriod(): Observable<void> {
    return this.httpClient.post<void>(`accounts/create-new-year`, {});
  }

  deleteFiscalPeriod(): Observable<void> {
    return this.httpClient.post<void>(`accounts/delete-year`, {});
  }

  getDashboardReport(): Observable<DashboardViewModel> {
    return this.httpClient.get<DashboardViewModel>(`report/dashboard`);
  }
}
