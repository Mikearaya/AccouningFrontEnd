import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerViewComponent } from './ledger-view.component';

describe('LedgerViewComponent', () => {
  let component: LedgerViewComponent;
  let fixture: ComponentFixture<LedgerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
