/** @format */

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ChecklistComponent } from './checklist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    ComponentFixture,
    TestBed,
    async,
    inject,
} from '@angular/core/testing';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckListReportApiService } from './check-list-report-api.service';
import { AccountingApiService } from 'src/app/Services/accounting-api.service';

describe('ChecklistComponent', () => {
    let component: ChecklistComponent;
    let fixture: ComponentFixture<ChecklistComponent>;
    const args: ClickEventArgs = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [ChecklistComponent],
            providers: [CheckListReportApiService, AccountingApiService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });
    it('Should call clickHandler', () => {
        spyOn(component, 'clickHandler');
        component.clickHandler(args);
        fixture.detectChanges();
        expect(component.clickHandler).toHaveBeenCalled();
    });
});
