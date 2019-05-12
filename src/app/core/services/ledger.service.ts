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
import { Observable } from "rxjs";
import {
  JornalEntryViewModel,
  LedgerEntryViewModel,
  UpdateLedgerStatus,
  LedgerEntry
} from "../../features/ledgers/ledger";

@Injectable()
export class LedgerService {
  private url = "ledgers";
  constructor(private httpClient: HttpClient) {}

  getAllLedgerEntries(query: string = ""): Observable<LedgerEntryViewModel[]> {
    return this.httpClient.get<LedgerEntryViewModel[]>(`${this.url}?${query}`);
  }

  getLedgerEntryById(id: number): Observable<JornalEntryViewModel> {
    return this.httpClient.get<JornalEntryViewModel>(`${this.url}/${id}`);
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
      `${this.url}/${updatedLedgerStatus.Id}`,
      updatedLedgerStatus
    );
  }

  deleteLedgerEntry(deletedLedgerId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${deletedLedgerId}`);
  }
}
