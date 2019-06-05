import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfGoodsSoldComponent } from './cost-of-goods-sold.component';

describe('CostOfGoodsSoldComponent', () => {
  let component: CostOfGoodsSoldComponent;
  let fixture: ComponentFixture<CostOfGoodsSoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostOfGoodsSoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostOfGoodsSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
