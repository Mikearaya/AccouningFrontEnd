import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationComponent } from "./pagination.component";
import { SharedModule } from "../shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { CoreModule } from "src/app/core/core.module";

describe("PaginationComponent", () => {
  let component: PaginationComponent;

  beforeEach(() => {
    component = new PaginationComponent();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
