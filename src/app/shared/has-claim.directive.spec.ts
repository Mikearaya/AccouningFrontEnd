/** @format */

import { HasClaimDirective } from './has-claim.directive';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from '../core/services/security-service.service';

describe('HasClaimDirective', () => {
    // tslint:disable-next-line: prefer-const
    let templateRef: TemplateRef<any>;
    // tslint:disable-next-line: prefer-const
    let viewContainer: ViewContainerRef;
    // tslint:disable-next-line: prefer-const
    let securityService: SecurityService;
    it('should create an instance', () => {
        const directive = new HasClaimDirective(
            templateRef,
            viewContainer,
            securityService
        );
        expect(directive).toBeTruthy();
    });
});
