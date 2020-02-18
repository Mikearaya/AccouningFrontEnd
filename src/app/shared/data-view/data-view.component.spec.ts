/** @format */

import { DataViewComponent } from './data-view.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security-service.service';

describe('Data view component', () => {
    const component: DataViewComponent = null;
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

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
