import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewYearDataRoutingModule } from './new-year-data-routing.module';
import { CreateNewYearDataComponent } from './create-new-year-data/create-new-year-data.component';

@NgModule({
  declarations: [CreateNewYearDataComponent],
  imports: [
    CommonModule,
    NewYearDataRoutingModule
  ]
})
export class NewYearDataModule { }
