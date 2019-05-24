import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintHeaderComponent } from './print-header.component';

describe('PrintHeaderComponent', () => {
  let component: PrintHeaderComponent;
  let fixture: ComponentFixture<PrintHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
