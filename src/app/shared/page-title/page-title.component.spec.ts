import { TestBed } from "@angular/core/testing";
import { PageTitleComponent } from "./page-title.component";

describe("Page identity", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageTitleComponent]
    });
  });
  const fixture = TestBed.createComponent(PageTitleComponent);
  const pagetitle = fixture.debugElement.componentInstance;
  it("Should create", () => {
    expect(pagetitle).toBeTruthy();
  });
});
