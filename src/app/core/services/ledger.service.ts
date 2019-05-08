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
  ReconciliationModel,
  PostingTypesView,
  LedgerEntryViewModel,
  CreateLedgerEntry,
  UpdateLedgerEntry
} from "../../features/ledgers/ledger";

@Injectable()
export class LedgerService {
  private url = "http://localhost:3000/ledgers";
  constructor(private httpClient: HttpClient) {}

  getAllLedgerEntries(
    query: string = "selectedColumns=Discription"
  ): Observable<LedgerEntryViewModel[]> {
    return this.httpClient.get<LedgerEntryViewModel[]>(`${this.url}?${query}`);
  }

  getLedgerEntryById(id: number): Observable<JornalEntryViewModel[]> {
    return this.httpClient.get<JornalEntryViewModel[]>(`${this.url}/${id}`);
  }

  addLedgerEntry(newLedger: CreateLedgerEntry): Observable<CreateLedgerEntry> {
    return this.httpClient.post<CreateLedgerEntry>(`${this.url}`, newLedger);
  }

  updateLedgerEntry(updatedLedger: UpdateLedgerEntry): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.url}`, updatedLedger);
  }

  deleteLedgerEntry(deletedLedgerId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${deletedLedgerId}`);
  }

  reconcileLedgerEntry(
    entryId: number,
    reconcieled: ReconciliationModel
  ): Observable<boolean> {
    return this.httpClient.put<boolean>(
      `${this.url}/reconcilations/${entryId}`,
      reconcieled
    );
  }

  getPostingTypes(): Observable<PostingTypesView[]> {
    return this.httpClient.get<PostingTypesView[]>(`${this.url}/postingtypes`);
  }
}
