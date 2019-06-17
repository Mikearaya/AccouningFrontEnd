import { DataViewComponent } from "./data-view.component";
import { Router, ActivatedRoute, convertToParamMap } from "@angular/router";
import { SecurityService } from "src/app/core/services/security-service.service";

describe("Data view component", () => {
  let component: DataViewComponent;
  let router: Router;
  let activatedRoute;
  const securityService: SecurityService = new SecurityService();

  beforeEach(() => {
    router = jasmine.createSpyObj("Router", ["Navigate"]);
    activatedRoute = {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: convertToParamMap({ id: 1 })
        }
      }
    };
  });
  component = new DataViewComponent(router, activatedRoute, securityService);
  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
