import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewYearDataComponent } from './create-new-year-data.component';

describe('CreateNewYearDataComponent', () => {
  let component: CreateNewYearDataComponent;
  let fixture: ComponentFixture<CreateNewYearDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewYearDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewYearDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
