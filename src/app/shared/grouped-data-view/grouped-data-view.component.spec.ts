import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GroupedDataViewComponent } from "./grouped-data-view.component";

describe("GroupedDataViewComponent", () => {
  let component: GroupedDataViewComponent;
  let fixture: ComponentFixture<GroupedDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupedDataViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
