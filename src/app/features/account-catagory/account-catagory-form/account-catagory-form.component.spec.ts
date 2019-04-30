import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCatagoryFormComponent } from './account-catagory-form.component';

describe('AccountCatagoryFormComponent', () => {
  let component: AccountCatagoryFormComponent;
  let fixture: ComponentFixture<AccountCatagoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCatagoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCatagoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
