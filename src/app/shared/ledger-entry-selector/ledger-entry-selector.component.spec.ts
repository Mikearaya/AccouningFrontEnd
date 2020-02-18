/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerEntrySelectorComponent } from './ledger-entry-selector.component';

describe('LedgerEntrySelectorComponent', () => {
    let component: LedgerEntrySelectorComponent;
    let fixture: ComponentFixture<LedgerEntrySelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LedgerEntrySelectorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LedgerEntrySelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
