import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";
import { BreadCrumbComponent } from "./bread-crumb.component";

describe("Breadcrumb", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ActivatedRoute],
      declarations: [BreadCrumbComponent]
    });
  });
  const fixture = TestBed.createComponent(BreadCrumbComponent);
  const breadcrump = fixture.debugElement.componentInstance;
  it("Should create", () => {
    expect(breadcrump).toBeTruthy();
  });
});
