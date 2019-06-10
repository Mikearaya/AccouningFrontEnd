import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SecurityService {
  securityObject: AppUserAuth;

  constructor() {
    this.securityObject = new AppUserAuth();

    this.securityObject = JSON.parse(
      localStorage.getItem("accountingBearerToken")
    );
  }

  logIn(entity: AppUser): Observable<AppUserAuth> {
    this.resetSecurityObject();

    if (this.securityObject.userName !== "") {
      localStorage.setItem(
        "accountingBearerToken",
        this.securityObject.bearerToken
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
  userName = "Appdiv system";
  bearerToken = "";
  isAuthenticated = true;
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
