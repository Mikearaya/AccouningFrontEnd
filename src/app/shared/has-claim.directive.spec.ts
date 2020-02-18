/** @format */

import { HasClaimDirective } from './has-claim.directive';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from '../core/services/security-service.service';

describe('HasClaimDirective', () => {
    let templateRef: TemplateRef<any>;
    let viewContainer: ViewContainerRef;
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
