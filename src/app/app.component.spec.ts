import { AppComponent } from "./app.component";
import { Router } from "@angular/router";

describe("AppComponent", () => {
  let component: AppComponent;
  let router: Router;
  beforeAll(() => {
    router = jasmine.createSpyObj("Router", ["navigate"]);
    component = new AppComponent(router);
  });
  it("Should be defined", () => {
    expect(component).toBeDefined();
  });
});
