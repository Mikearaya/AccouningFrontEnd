import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsScheduleComponent } from './accounts-schedule.component';

describe('AccountsScheduleComponent', () => {
  let component: AccountsScheduleComponent;
  let fixture: ComponentFixture<AccountsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
