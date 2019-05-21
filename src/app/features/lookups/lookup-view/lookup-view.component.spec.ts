import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { LookupViewComponent } from "./lookup-view.component";
import { LookupService } from "../../../core/services/lookup.service";
import { Lookup } from "../lookups";

describe("LookupViewComponent", () => {
  let component: LookupViewComponent;
  let fixture: ComponentFixture<LookupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [LookupViewComponent],
      providers: [LookupService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should be created", async(() => {
    expect(component).toBeTruthy();
  }));
  describe("Delete catagory", () => {
    it("Should be called", () => {
      spyOn(component, "deleteLookup");
      component.deleteLookup("Id");
      expect(component.deleteLookup).toHaveBeenCalled();
    });
  });
  describe("ngOnInit", () => {
    it("Should be called and list all lookups", () => {
      const response: Lookup[] = [
        {
          Id: 1,
          Type: "Appdiv",
          Value: "123"
        },
        {
          Id: 2,
          Type: "appdiv",
          Value: "456"
        }
      ];
      spyOn(component, "loadLookups").and.returnValue(of(response));
      component.loadLookups();
      fixture.detectChanges();
      expect(component.loadLookups).toHaveBeenCalled();
      expect(response.length).toEqual(2);
    });
  });
});
