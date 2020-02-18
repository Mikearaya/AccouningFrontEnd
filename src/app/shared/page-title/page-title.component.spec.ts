/** @format */

import { TestBed } from '@angular/core/testing';
import { PageTitleComponent } from './page-title.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';

describe('Page title', () => {
    let router: Router;
    let activatedRoute;
    let component: PageTitleComponent;
    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['navigate']);
        activatedRoute = {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: 1 }),
                },
            },
        };

        component = new PageTitleComponent(router, activatedRoute);
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});
