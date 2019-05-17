import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Checklist, SubsidaryLedgerViewMdel } from "../report";

@Injectable({
  providedIn: "root"
})
export class SubsidaryService {
  private url = "subsidaries";

  constructor(private httpClient: HttpClient) {}

  getSubsidaryLedgerReport(): Observable<SubsidaryLedgerViewMdel[]> {
    return this.httpClient.get<SubsidaryLedgerViewMdel[]>(`${this.url}`);
  }
}
