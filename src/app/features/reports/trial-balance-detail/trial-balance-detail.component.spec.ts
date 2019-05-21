import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrialBalanceDetailComponent } from "./trial-balance-detail.component";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReportApiService } from "../report-api.service";

describe("TrialBalanceDetailComponent", () => {
  let component: TrialBalanceDetailComponent;
  let fixture: ComponentFixture<TrialBalanceDetailComponent>;
  let args: ClickEventArgs;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [TrialBalanceDetailComponent],
      providers: [ReportApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialBalanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should be created", () => {
    expect(component).toBeTruthy();
  });
  it("Should be called clickHandler", () => {
    spyOn(component, "clickHandler");
    component.clickHandler(args);
    fixture.detectChanges();
    expect(component.clickHandler).toHaveBeenCalled();
  });
});