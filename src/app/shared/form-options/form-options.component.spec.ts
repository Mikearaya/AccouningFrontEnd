/** @format */

import { FormOptionsComponent } from './form-options.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
describe('Form option component', () => {
    let location: Location;
    let component: FormOptionsComponent;
    let router: Router;

    beforeEach(() => {
        location = jasmine.createSpyObj('Location', ['back']);
        router = jasmine.createSpyObj('Router', ['Navigate']);
        component = new FormOptionsComponent(location, router);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
