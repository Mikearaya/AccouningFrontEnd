import { TestBed, async } from "@angular/core/testing";
import { PageIdentityComponent } from "./page-identity.component";
import { SharedModule } from "../shared.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("Page identity Component", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule]
    }).compileComponents();
  }));

  it("should be created", async(() => {
    const fixture = TestBed.createComponent(PageIdentityComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
