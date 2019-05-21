import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsolidatedTrialBalanceComponent } from "./consolidated-trial-balance.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReportApiService } from "../report-api.service";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";

describe("ConsolidatedTrialBalanceComponent", () => {
  let component: ConsolidatedTrialBalanceComponent;
  let fixture: ComponentFixture<ConsolidatedTrialBalanceComponent>;
  let args: ClickEventArgs;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ConsolidatedTrialBalanceComponent],
      providers: [ReportApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedTrialBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should be create", () => {
    expect(component).toBeTruthy();
  });
  it("Should be called clickHandler", () => {
    spyOn(component, "clickHandler");
    component.clickHandler(args);
    fixture.detectChanges();
    expect(component.clickHandler).toHaveBeenCalled();
  });
});
