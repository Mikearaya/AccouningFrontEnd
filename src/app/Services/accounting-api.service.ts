/** @format */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvailableYearsModel, DashboardViewModel } from './system-data.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AccountingApiService {
    private selectedYear = '';
    public $CurrentYear: BehaviorSubject<string> = new BehaviorSubject('');
    constructor(private httpClient: HttpClient) {
        this.$CurrentYear.next(this.getSelectedYear());
    }

    getAvailableYears(): Observable<AvailableYearsModel[]> {
        return this.httpClient.get<AvailableYearsModel[]>(
            `system-lookups/years`
        );
    }

    setSelectedYear(newYear: string): void {
        this.selectedYear = newYear;
        localStorage.setItem('selectedYear', this.selectedYear);
        this.$CurrentYear.next(this.selectedYear);
    }
    getSelectedYear(): string {
        const selectedYear = localStorage.getItem('selectedYear');
        // alert(selYear);
        return selectedYear;
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
