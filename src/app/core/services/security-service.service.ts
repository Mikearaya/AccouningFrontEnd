import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SecurityService {
  securityObject: AppUserAuth;

  constructor(private httpClient: HttpClient) {
    this.securityObject = new AppUserAuth();
    this.securityObject = JSON.parse(
      localStorage.getItem("accountingBearerToken")
    );
    if (localStorage.getItem("accountingBearerToken")) {
      localStorage.setItem(
        "accountingBearerToken",
        JSON.stringify(this.securityObject)
      );
    }
  }

  logIn(): Observable<AppUserAuth> {
    this.resetSecurityObject();

    if (
      this.securityObject.userName !== "" &&
      this.securityObject.isAuthenticated
    ) {
      localStorage.setItem(
        "accountingBearerToken",
        this.securityObject.bearerToken
      );
      this.httpClient
        .get<AppUserAuth>(
          `http://erp.net/smarthrm/authenticate/my_role/accounting`
        )
        .subscribe(
          (data: AppUserAuth) => (this.securityObject = data),
          (error: HttpErrorResponse) =>
            (window.location.href = `http://erp.net/smarthrm/authenticate/logout`)
        );
    }

    return of<AppUserAuth>(this.securityObject);
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.claims = [];
    this.securityObject.isAuthenticated = false;

    localStorage.removeItem("accountingBearerToken");
  }

  logOut() {
    this.resetSecurityObject();
    window.location.href = "https://www.google.com";
  }

  hasClaim(claimType: any, claimValue?: any): boolean {
    let ret = false;
    if (typeof claimType === "string") {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;

      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);

          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    let auth: AppUserAuth = null;

    auth = this.securityObject;

    if (auth) {
      if (claimType.indexOf(":") >= 0) {
        const words: string[] = claimType.split(":");
        claimType = words[0].toLocaleLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLocaleLowerCase();
        claimValue = claimValue ? claimValue : "true";
      }

      const s = auth.claims.find(
        c =>
          c.claimType.toLocaleLowerCase() === claimType &&
          c.claimValue === claimValue
      );

      ret =
        auth.claims.find(
          c =>
            c.claimType.toLocaleLowerCase() === claimType &&
            c.claimValue === claimValue
        ) != null;
    }

    return ret;
  }
}

export class AppUserAuth {
  userName = "";
  bearerToken = "";
  isAuthenticated = false;
  claims: ClaimModel[] = [];
}

export interface ClaimModel {
  claimType: string;
  claimValue: string;
}

export class AppUser {
  userName = "";
  password = "";
}
