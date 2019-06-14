import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { AccountCategorySelectorComponent } from "./account-category-selector.component";
import { AccountCatagoryApiService } from "src/app/core/account-catagory-api.service";
import { SharedModule } from "../shared.module";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("AccountCategorySelectorComponent", () => {
  let component: AccountCategorySelectorComponent;
  let fixture: ComponentFixture<AccountCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [AccountCatagoryApiService, AccountingApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", inject([AccountCatagoryApiService], () => {
    expect(component).toBeTruthy();
  }));
});
