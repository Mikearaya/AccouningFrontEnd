/** @format */

import { Router } from '@angular/router';

describe('AppComponent', () => {
    let router: Router;

    beforeAll(() => {
        router = jasmine.createSpyObj('Router', ['navigate']);
    });
    it('Should be defined', () => {});
});
