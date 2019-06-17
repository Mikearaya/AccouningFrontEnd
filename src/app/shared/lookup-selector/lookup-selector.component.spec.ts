import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { LookupSelectorComponent } from "./lookup-selector.component";
import { SharedModule } from "../shared.module";
import { LookupService } from "src/app/core/services/lookup.service";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("LookupSelectorComponent", () => {
  let component: LookupSelectorComponent;
  let fixture: ComponentFixture<LookupSelectorComponent>;
  let lookupApi: LookupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [LookupService, AccountingApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
