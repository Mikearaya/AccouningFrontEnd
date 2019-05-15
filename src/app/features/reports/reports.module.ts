import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportsRoutingModule } from "./reports-routing.module";
import { ChecklistComponent } from "./checklist/checklist.component";
import { SharedModule } from "src/app/shared/shared.module";
import { GridModule } from "@syncfusion/ej2-angular-grids";

@NgModule({
  declarations: [ChecklistComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule]
})
export class ReportsModule {}
