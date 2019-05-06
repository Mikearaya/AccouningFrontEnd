import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupViewComponent } from './lookup-view.component';

describe('LookupViewComponent', () => {
  let component: LookupViewComponent;
  let fixture: ComponentFixture<LookupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
