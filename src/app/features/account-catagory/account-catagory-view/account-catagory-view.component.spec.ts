/** @format */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCatagoryViewComponent } from './account-catagory-view.component';
import { AccountCatagoryApiService } from '../../../core/account-catagory-api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountCategory } from '../account-catagory-domain';
import { of } from 'rxjs';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('AccountCatagoryViewComponent', () => {
    let component: AccountCatagoryViewComponent;
    let fixture: ComponentFixture<AccountCatagoryViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations: [AccountCatagoryViewComponent],
            providers: [AccountCatagoryApiService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountCatagoryViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });
    describe('Delete catagory', () => {
        it('Should be called', () => {
            spyOn(component, 'deleteCatagory');
            component.deleteCatagory('Id');
            expect(component.deleteCatagory).toHaveBeenCalled();
        });
    });
    describe('ngOnInit', () => {
        it('Should be called and list all catagories', () => {
            const response: AccountCategory[] = [
                {
                    Id: 1,
                    CatagoryName: 'catagory 2',
                    AccountType: 'posting type',
                },
                {
                    Id: 2,
                    CatagoryName: 'catagory 2',
                    AccountType: 'posting type',
                },
            ];
        });
    });
});
