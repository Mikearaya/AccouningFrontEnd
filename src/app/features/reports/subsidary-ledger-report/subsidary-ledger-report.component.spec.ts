import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { SubsidaryLedgerReportComponent } from "./subsidary-ledger-report.component";
import { SubsidaryLedgerApiService } from "./subsidary-ledger-api.service";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("SubsidaryLedgerReportComponent", () => {
  let component: SubsidaryLedgerReportComponent;
  let fixture: ComponentFixture<SubsidaryLedgerReportComponent>;
  let args: ClickEventArgs;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [SubsidaryLedgerReportComponent],
      providers: [SubsidaryLedgerApiService, AccountingApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidaryLedgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should be created", () => {
    expect(component).toBeTruthy();
  });
  it("Should call clickHandler", () => {
    spyOn(component, "clickHandler");
    component.clickHandler(args);
    fixture.detectChanges();
    expect(component.clickHandler).toHaveBeenCalled();
  });
});
