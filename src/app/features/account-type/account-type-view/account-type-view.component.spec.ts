import { TestBed, async } from "@angular/core/testing";
import { AccountsService } from "../../../core/services/accounts.service";
import { Router, ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountTypeViewComponent } from "./account-type-view.component";
import { AccountsViewComponent } from "../../accounts/accounts-view/accounts-view.component";
import { AccountTypeService } from "../account-type.service";

fdescribe("Accounts type view component", () => {
  let router: Router;
  let activatedRoute;
  let component: AccountTypeViewComponent;
  let typeService: AccountTypeService;

  beforeEach(async(() => {
    router = jasmine.createSpyObj("Router", ["navigate"]);
    activatedRoute = {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: convertToParamMap({ id: 1 })
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [AccountsViewComponent],
      imports: [RouterTestingModule, SharedModule],
      providers: [AccountTypeService, activatedRoute]
    }).compileComponents();
  }));
  component = new AccountTypeViewComponent(router, typeService, activatedRoute);

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
