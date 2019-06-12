import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "./security-service.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const claimType: string = next.data["claimType"];

    if (!this.securityService.securityObject.isAuthenticated) {
      window.location.href = "https://www.google.com";
    } else {
      return true;
    }
    if (this.securityService.hasClaim(claimType)) {
      return true;
    } else {
      this.router.navigate(["unauthorized"]);
    }

    return true;
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.securityService.securityObject.isAuthenticated) {
      window.location.href = "https://www.google.com";
      return false;
    } else {
      return true;
    }
  }
}
