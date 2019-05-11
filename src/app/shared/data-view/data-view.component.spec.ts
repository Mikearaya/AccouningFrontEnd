import { DataViewComponent } from "./data-view.component";
import { Router, ActivatedRoute, convertToParamMap } from "@angular/router";

describe("Data view component", () => {
  let component: DataViewComponent;
  let router: Router;
  let activatedRoute;

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
  component = new DataViewComponent(router, activatedRoute);
  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
