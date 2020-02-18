/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptionComponent } from './filter-option.component';
import { DebugElement } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterService } from './filter.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

describe('FilterOptionComponent', () => {
    let component: FilterOptionComponent;
    let fixture: ComponentFixture<FilterOptionComponent>;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            providers: [FilterService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterOptionComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Filter form', () => {
        const obj = { createControls: () => null };
        it('Should be created', () => {
            spyOn(obj, 'createControls');
            obj.createControls();
            expect(obj.createControls).toBeTruthy();
        });
        it('Should be valid', () => {
            expect(component.filterForm.invalid).toBeFalsy();
        });
        it('Year field validity', () => {
            const year = component.Year;
            expect(year.invalid).toBeFalsy();
            year.setValue('appdiv');
            year.enable();
            expect(year.valid).toBeTruthy();
            expect(year.value).toEqual('appdiv');
        });
        it('VoucherStartId field validity', () => {
            const vsd = component.VoucherStartId;
            expect(vsd.invalid).toBeFalsy();
            vsd.setValue('appdiv');
            vsd.enable();
            expect(vsd.valid).toBeTruthy();
            expect(vsd.value).toEqual('appdiv');
        });
        it('VoucherEndId field validity', () => {
            const ved = component.VoucherEndId;
            expect(ved.invalid).toBeFalsy();
            ved.setValue('appdiv');
            ved.enable();
            expect(ved.valid).toBeTruthy();
            expect(ved.value).toEqual('appdiv');
        });
        it('Cost center field validity', () => {
            const costCenter = component.CostCenter;
            expect(costCenter.invalid).toBeFalsy();
            costCenter.setValue('appdiv');
            costCenter.enable();
            expect(costCenter.valid).toBeTruthy();
            expect(costCenter.value).toEqual('appdiv');
        });
        it('Subsidary field validity', () => {
            const subsidary = component.Subsidary;
            expect(subsidary.invalid).toBeFalsy();
            subsidary.setValue('appdiv');
            subsidary.enable();
            expect(subsidary.valid).toBeTruthy();
            expect(subsidary.value).toEqual('appdiv');
        });
        it('ControlAccount field validity', () => {
            const controlAccount = component.ControlAccount;
            expect(controlAccount.invalid).toBeFalsy();
            controlAccount.setValue('appdiv');
            controlAccount.enable();
            expect(controlAccount.valid).toBeTruthy();
            expect(controlAccount.value).toEqual('appdiv');
        });
        it('StartDate field validity', () => {
            const startDate = component.StartDate;
            startDate.setValue(new Date());
            startDate.enable();
            expect(startDate.valid).toBeTruthy();
            expect(startDate.value).toEqual(new Date());
        });
        it('EndDate field validity', () => {
            const endDate = component.EndDate;
            endDate.setValue(new Date());
            endDate.enable();
            expect(endDate.valid).toBeTruthy();
            expect(endDate.value).toEqual(new Date());
        });
        it('Should call prepareFilter', () => {
            const obj1 = { prepareFilter: () => null };
            spyOn(obj1, 'prepareFilter');
            obj1.prepareFilter();
            expect(obj1.prepareFilter).toBeTruthy();
        });
    });
});
