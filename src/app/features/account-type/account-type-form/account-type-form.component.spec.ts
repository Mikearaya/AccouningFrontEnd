/** @format */

import { AccountTypeFormComponent } from './account-type-form.component';
import {
    ComponentFixture,
    TestModuleMetadata,
    TestBed,
    async,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe(' Account type form component', () => {
    let component: AccountTypeFormComponent;
    let fixture: ComponentFixture<AccountTypeFormComponent>;
    let debugEl: DebugElement;

    const makeCompiledTestBed = (provider?: object): void => {
        const moduleDef: TestModuleMetadata = {
            imports: [SharedModule, RouterTestingModule],
            declarations: [AccountTypeFormComponent],
            providers: [AccountTypeService, AccountingApiService],
        };
        if (moduleDef.providers && provider) {
            moduleDef.providers.push(provider);
        }
        TestBed.configureTestingModule(moduleDef).compileComponents();
    };
    const setupTestVars = (): void => {
        fixture = TestBed.createComponent(AccountTypeFormComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        fixture.detectChanges();
    };

    describe('When id is not provided in the url param--(Create account type form)', () => {
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
        describe('Account type form', () => {
            let err = {};
            const obj1 = {
                createTypeForm: () => null,
            };
            it('Should be created', () => {
                spyOn(obj1, 'createTypeForm');
                obj1.createTypeForm();
                expect(obj1.createTypeForm).toBeTruthy();
            });
            const obj2 = {
                initializeType: () => null,
            };
            it('should be created for initialize catagory', () => {
                spyOn(obj2, 'initializeType');
                obj2.initializeType();
                expect(obj2.initializeType).toBeTruthy();
            });

            it('Should be invalid when empty', () => {
                expect(component.typeForm.valid).toBeFalsy();
            });
            it('Catagory field validity', () => {
                const type = component.Type;
                expect(type.valid).toBeFalsy();
                type.setValue('appdiv');
                expect(type.valid).toBeTruthy();
                err = type.errors || {};
                expect(err['required']).toBeFalsy();
                type.setValue('');
                err = type.errors || {};
                expect(err['required']).toBeTruthy();
            });

            it('Account type field validity', () => {
                const accountType = component.AccountType;
                expect(accountType.valid).toBeFalsy();
                accountType.setValue('appdiv');
                expect(accountType.valid).toBeTruthy();
                expect(accountType.value).toEqual('appdiv');
                err = accountType.errors || {};
                expect(err['required']).toBeFalsy();
                accountType.setValue('');
                err = accountType.errors || {};
                expect(err['required']).toBeTruthy();
            });

            it('Summerize report field validity', () => {
                const summerizeReport = component.SummerizeReport;
                expect(summerizeReport.valid).toBeTruthy();
                summerizeReport.setValue(true);
                expect(summerizeReport.value).toEqual(true);
            });

            it('Should be valid when not empty', () => {
                component.Type.setValue('Appdiv');
                component.AccountType.setValue('Appdiv');
                component.SummerizeReport.setValue(true);
                expect(component.typeForm.valid).toBeTruthy();
            });
        });
    });
});
