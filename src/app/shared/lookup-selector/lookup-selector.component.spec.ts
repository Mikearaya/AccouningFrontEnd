import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { LookupSelectorComponent } from "./lookup-selector.component";
import { SharedModule } from "../shared.module";
import { LookupService } from "src/app/features/lookups/lookup.service";

describe("LookupSelectorComponent", () => {
  let component: LookupSelectorComponent;
  let fixture: ComponentFixture<LookupSelectorComponent>;
  let lookupApi: LookupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [LookupService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", inject([LookupService], lookupApi => {
    expect(component).toBeTruthy();
  }));
});
