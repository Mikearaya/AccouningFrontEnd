/*
 * @CreateTime: Dec 11, 2018 4:01 PM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 8, 2019 4:55 PM
 * @Description: Modify Here, Please
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LedgerComponent } from "./ledger/ledger.component";
import { LedgerViewComponent } from "./ledger-view/ledger-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { LedgerRoutingModule } from "./ledger-routing.module";
import { LedgerService } from "../../core/services/ledger.service";

@NgModule({
  imports: [CommonModule, SharedModule, LedgerRoutingModule],
  declarations: [LedgerComponent, LedgerViewComponent],
  providers: [LedgerService]
})
export class LedgerModule {}
