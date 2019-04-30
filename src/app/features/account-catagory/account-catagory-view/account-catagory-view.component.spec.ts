import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCatagoryViewComponent } from './account-catagory-view.component';

describe('AccountCatagoryViewComponent', () => {
  let component: AccountCatagoryViewComponent;
  let fixture: ComponentFixture<AccountCatagoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCatagoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCatagoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
