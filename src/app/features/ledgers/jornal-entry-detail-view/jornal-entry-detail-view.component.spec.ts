import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornalEntryDetailViewComponent } from './jornal-entry-detail-view.component';

describe('JornalEntryDetailViewComponent', () => {
  let component: JornalEntryDetailViewComponent;
  let fixture: ComponentFixture<JornalEntryDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornalEntryDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornalEntryDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
