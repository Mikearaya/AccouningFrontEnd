import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterOptionComponent } from "./filter-option.component";

describe("FilterOptionComponent", () => {
  let component: FilterOptionComponent;
  let fixture: ComponentFixture<FilterOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterOptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
