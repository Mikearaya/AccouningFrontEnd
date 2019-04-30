import { TestBed } from "@angular/core/testing";
import { PageIdentityComponent } from "./page-identity.component";

describe("Page identity", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageIdentityComponent]
    });
  });
  const fixture = TestBed.createComponent(PageIdentityComponent);
  const pageidentity = fixture.debugElement.componentInstance;
  it("Should create", () => {
    expect(pageidentity).toBeTruthy();
  });
});
