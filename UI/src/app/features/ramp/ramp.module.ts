import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RampComponent } from './ramp.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RampComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RampComponent
  ]
})
export class RampModule { }
