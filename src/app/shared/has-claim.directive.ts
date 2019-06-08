import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { SecurityService } from "../core/services/security-service.service";

@Directive({
  selector: "[appHasClaim]"
})
export class HasClaimDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService
  ) {}

  @Input() set hasClaim(claimType: any) {
    if (this.securityService.hasClaim(claimType)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
