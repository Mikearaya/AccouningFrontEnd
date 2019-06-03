import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountScheduleComponent } from './account-schedule.component';

describe('AccountScheduleComponent', () => {
  let component: AccountScheduleComponent;
  let fixture: ComponentFixture<AccountScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
