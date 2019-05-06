import { TestBed, async } from "@angular/core/testing";
import { AccountsService } from "../../../core/services/accounts.service";
import { AccountsViewComponent } from "./accounts-view.component";
import { Router, ActivatedRoute, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "src/app/shared/shared.module";

describe("Accounts view component", () => {
  let router: Router;
  let activatedRoute;
  let component: AccountsViewComponent;
  let accountsService: AccountsService;

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
      providers: [AccountsService, activatedRoute]
    }).compileComponents();
  }));
  component = new AccountsViewComponent(
    router,
    accountsService,
    activatedRoute
  );

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
