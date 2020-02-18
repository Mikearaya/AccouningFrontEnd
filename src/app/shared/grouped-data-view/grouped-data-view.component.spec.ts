/** @format */

import { async, TestBed } from '@angular/core/testing';

import { GroupedDataViewComponent } from './grouped-data-view.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security-service.service';

describe('GroupedDataViewComponent', () => {
    let component: GroupedDataViewComponent;
    let router: Router;
    let activatedRoute;
    const securityService: SecurityService = null;
    beforeEach(async(() => {
        router = jasmine.createSpyObj('Router', ['Navigate']);
        activatedRoute = {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: 1 }),
                },
            },
        };
    }));
    component = new GroupedDataViewComponent(
        router,
        activatedRoute,
        securityService
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
