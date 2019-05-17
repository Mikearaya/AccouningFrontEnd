import { Injectable } from "@angular/core";
import { LookupIndexView, YearIndexView } from "./filter";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  public url2 = "lookups-index";
  public url1 = "years-index";

  constructor(private httpClient: HttpClient) {}

  getLookups(searchString: string = ""): Observable<LookupIndexView[]> {
    return this.httpClient.get<LookupIndexView[]>(
      `${this.url2}?${searchString}`
    );
  }
  getYearList(searchString: string = ""): Observable<YearIndexView[]> {
    return this.httpClient.get<YearIndexView[]>(`${this.url1}?${searchString}`);
  }
}
