import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateNewYearDataComponent } from "./create-new-year-data.component";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { HttpClient } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CreateNewYearDataComponent", () => {
  let component: CreateNewYearDataComponent;
  let fixture: ComponentFixture<CreateNewYearDataComponent>;
  let httpClient: HttpClient;
  let accountingApiService: AccountingApiService = new AccountingApiService(
    httpClient
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [CreateNewYearDataComponent],
      providers: [AccountingApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewYearDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
