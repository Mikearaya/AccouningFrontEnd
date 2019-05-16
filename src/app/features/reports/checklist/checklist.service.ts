import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Checklist } from "../report";

@Injectable({
  providedIn: "root"
})
export class ChecklistService {
  private url = "checklist";
  constructor(private httpClient: HttpClient) {}

  getChecklistReport(): Observable<Checklist[]> {
    return this.httpClient.get<Checklist[]>(`${this.url}`);
  }
}
