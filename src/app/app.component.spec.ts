import { AppComponent } from "./app.component";
import { Router } from "@angular/router";
import { SecurityService } from "./core/services/security-service.service";
import { AccountingApiService } from "./Services/accounting-api.service";
import { Location } from "@angular/common";

describe("AppComponent", () => {
  let component: AppComponent;
  let router: Router;
  let accountingApi: AccountingApiService;
  let location: Location;
  const securityService: SecurityService = new SecurityService();
  beforeAll(() => {
    router = jasmine.createSpyObj("Router", ["navigate"]);
    component = new AppComponent(
      router,
      accountingApi,
      location,
      securityService
    );
  });
  it("Should be defined", () => {
    expect(component).toBeDefined();
  });
});
