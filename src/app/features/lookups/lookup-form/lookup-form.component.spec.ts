/** @format */

import {
    ComponentFixture,
    TestModuleMetadata,
    TestBed,
    async,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { LookupFormComponent } from './lookup-form.component';
import { LookupService } from '../../../core/services/lookup.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe(' Lookup form component', () => {
    let component: LookupFormComponent;
    let fixture: ComponentFixture<LookupFormComponent>;
    let debugEl: DebugElement;

    const makeCompiledTestBed = (provider?: object): void => {
        const moduleDef: TestModuleMetadata = {
            imports: [SharedModule, RouterTestingModule],
            declarations: [LookupFormComponent],
            providers: [LookupService, AccountingApiService],
        };
        if (moduleDef.providers && provider) {
            moduleDef.providers.push(provider);
        }
        TestBed.configureTestingModule(moduleDef).compileComponents();
    };
    const setupTestVars = (): void => {
        fixture = TestBed.createComponent(LookupFormComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
    };

    describe('When id is not provided in the url param--(Lookup form)', () => {
        beforeEach(async(makeCompiledTestBed));
        beforeEach(setupTestVars);
        it('Should be created ', () => {
            expect(component).toBeTruthy();
        });

        describe('OnSubmit', () => {
            it('Should be called', () => {
                spyOn(component, 'onSubmit');
                component.onSubmit();
                expect(component.onSubmit).toHaveBeenCalled();
            });
        });
        describe('Lookup form', () => {
            const err = {};
            const obj1 = {
                createLookupForm: () => null,
            };
            it('Should be created', () => {
                spyOn(obj1, 'createLookupForm');
                obj1.createLookupForm();
                expect(obj1.createLookupForm).toBeTruthy();
            });
            const obj2 = {
                initializeLookup: () => null,
            };
            it('should be created for initialize lookup', () => {
                spyOn(obj2, 'initializeLookup');
                obj2.initializeLookup();
                expect(obj2.initializeLookup).toBeTruthy();
            });

            it('Should be invalid when empty', () => {
                expect(component.lookupForm.valid).toBeFalsy();
            });
            it('Lookups array validity', () => {
                const lookups = component.Lookups;
                expect(lookups.valid).toBeFalsy();
                lookups.setValue([{ Type: 'type1', Value: 'val2' }]);
                expect(lookups.valid).toBeTruthy();
                expect(lookups.length).toEqual(1);
            });

            it('Should be valid when not empty', () => {
                component.Lookups.setValue([{ Type: '01', Value: 'val1' }]);
                expect(component.lookupForm.valid).toBeTruthy();
            });
        });
    });
});
