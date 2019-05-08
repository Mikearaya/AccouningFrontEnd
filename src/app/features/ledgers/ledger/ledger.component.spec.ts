import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerComponent } from './ledger.component';

describe('LedgerComponent', () => {
  let component: LedgerComponent;
  let fixture: ComponentFixture<LedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
