import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountCatagoryRoutingModule } from "./account-catagory-routing.module";
import { AccountCatagoryFormComponent } from "./account-catagory-form/account-catagory-form.component";
import { AccountCatagoryViewComponent } from "./account-catagory-view/account-catagory-view.component";
import { AccountCatagoryApiService } from "./account-catagory-api.service";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [AccountCatagoryFormComponent, AccountCatagoryViewComponent],
  imports: [CommonModule, SharedModule, AccountCatagoryRoutingModule],
  providers: [AccountCatagoryApiService]
})
export class AccountCatagoryModule {}
