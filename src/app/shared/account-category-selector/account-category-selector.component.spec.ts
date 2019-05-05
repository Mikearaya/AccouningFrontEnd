import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCategorySelectorComponent } from './account-category-selector.component';

describe('AccountCategorySelectorComponent', () => {
  let component: AccountCategorySelectorComponent;
  let fixture: ComponentFixture<AccountCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
