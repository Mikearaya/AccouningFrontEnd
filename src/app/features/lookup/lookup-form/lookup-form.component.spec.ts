import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupFormComponent } from './lookup-form.component';

describe('LookupFormComponent', () => {
  let component: LookupFormComponent;
  let fixture: ComponentFixture<LookupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
