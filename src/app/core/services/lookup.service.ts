import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { catchError } from "rxjs/operators";
import {
  Lookup,
  LookupView,
  LookupsIndexView
} from "../../features/lookups/lookups";

@Injectable()
export class LookupService {
  private url = "system-lookups";

  constructor(private httpClient: HttpClient) {}

  createLookup(newLookup: Lookup): Observable<LookupView> {
    return this.httpClient
      .post<LookupView>(`${this.url}`, newLookup)
      .pipe(catchError(this.handleError));
  }

  getLookupId(id: number): Observable<LookupView> {
    return this.httpClient.get<LookupView>(`${this.url}/${id}`);
  }

  getLookupIndex(searchString: string = ""): Observable<LookupsIndexView[]> {
    return this.httpClient.get<LookupsIndexView[]>(
      `${this.url}?type=cost center${searchString}`
    );
  }

  getLookups(searchString: string = ""): Observable<LookupView[]> {
    return this.httpClient.get<LookupView[]>(`${this.url}?${searchString}`);
  }

  getLookUpType(type: string): Observable<LookupsIndexView[]> {
    return this.httpClient.get<LookupsIndexView[]>(
      `${this.url}/type?type=${type}`
    );
  }

  updateLookup(id: number, updatedLookup: Lookup): Observable<void> {
    updatedLookup.Id = id;

    return this.httpClient.put<void>(`${this.url}/${id}`, updatedLookup);
  }

  deleteLookup(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  private handleError(error: Response | any) {
    console.log(error);
    return of(error);
  }
}
