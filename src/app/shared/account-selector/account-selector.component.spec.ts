import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { AccountSelectorComponent } from "./account-selector.component";
import { AccountsService } from "src/app/core/services/accounts.service";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "../shared.module";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("AccountSelectorComponent", () => {
  let component: AccountSelectorComponent;
  let fixture: ComponentFixture<AccountSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      providers: [AccountsService, AccountingApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", inject([AccountsService], () => {
    expect(component).toBeTruthy();
  }));
});
