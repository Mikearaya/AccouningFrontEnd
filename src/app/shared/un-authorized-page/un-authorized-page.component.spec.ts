import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizedPageComponent } from './un-authorized-page.component';

describe('UnAuthorizedPageComponent', () => {
  let component: UnAuthorizedPageComponent;
  let fixture: ComponentFixture<UnAuthorizedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthorizedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
