import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountCatagoryRoutingModule } from "./account-catagory-routing.module";
import { AccountCatagoryFormComponent } from "./account-catagory-form/account-catagory-form.component";
import { AccountCatagoryViewComponent } from "./account-catagory-view/account-catagory-view.component";
import { AccountCatagoryApiService } from "../../core/account-catagory-api.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "src/app/core/core.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RmHeaderInterceptorService } from "../Services/rm-header-interceptor.service";

@NgModule({
  declarations: [AccountCatagoryFormComponent, AccountCatagoryViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountCatagoryRoutingModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RmHeaderInterceptorService,
      multi: true
    }
  ]
})
export class AccountCatagoryModule {}
