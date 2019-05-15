import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ChecklistComponent } from "./checklist.component";
import { ChecklistService } from "./checklist.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Checklist } from "../report";

describe("ChecklistComponent", () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ChecklistComponent],
      providers: [ChecklistService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should be created", () => {
    expect(component).toBeTruthy();
  });
  describe("ngOnInit", () => {
    it("Should be called and list", () => {
      const response: Checklist[] = [
        {
          ReferenceNumber: "100",
          Date: new Date(),
          Description: "Appropration of Truck",
          Entries: [
            {
              ControlAccountId: "12",
              SubAccountId: "11",
              AccountId: "2222",
              Credit: 2,
              Debit: 2
            },
            {
              ControlAccountId: "12",
              SubAccountId: "11",
              AccountId: "2222",
              Credit: 2,
              Debit: 2
            },
            {
              ControlAccountId: "12",
              SubAccountId: "11",
              AccountId: "2222",
              Credit: 2,
              Debit: 2
            }
          ]
        },
        {
          ReferenceNumber: "100",
          Date: new Date(),
          Description: "Appropration of Truck",
          Entries: [
            {
              ControlAccountId: "12",
              SubAccountId: "11",
              AccountId: "2222",
              Credit: 2,
              Debit: 2
            },
            {
              ControlAccountId: "12",
              SubAccountId: "11",
              AccountId: "2222",
              Credit: 2,
              Debit: 2
            },
            {
              ControlAccountId: "12",
              SubAccountId: "11",
              AccountId: "2222",
              Credit: 2,
              Debit: 2
            }
          ]
        }
      ];
      spyOn(component, "loadChecklistReports").and.returnValue(of(response));
      component.loadChecklistReports();
      fixture.detectChanges();
      expect(component.loadChecklistReports).toHaveBeenCalled();
      expect(response.length).toEqual(2);
    });
  });
});
