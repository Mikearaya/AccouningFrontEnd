import { FormOptionsComponent } from "./form-options.component";

describe("Form option component", () => {
  let location;
  let component: FormOptionsComponent;

  beforeEach(() => {
    location = jasmine.createSpyObj("Location", ["back"]);
    component = new FormOptionsComponent(location);
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
