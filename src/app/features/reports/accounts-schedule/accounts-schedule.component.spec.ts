import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AccountsScheduleComponent } from "./accounts-schedule.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("AccountsScheduleComponent", () => {
  let component: AccountsScheduleComponent;
  let fixture: ComponentFixture<AccountsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [AccountsScheduleComponent],
      providers: [AccountingApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
