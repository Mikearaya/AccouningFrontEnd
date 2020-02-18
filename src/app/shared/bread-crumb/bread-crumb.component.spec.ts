/** @format */

import { BreadCrumbComponent } from './bread-crumb.component';

import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

describe('Bread crumb component', () => {
    let component: BreadCrumbComponent;
    let router: Router;
    let activatedRoute;

    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['Navigate']);
        activatedRoute = {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: 1 }),
                },
            },
        };
    });
    component = new BreadCrumbComponent(router, activatedRoute);
    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
