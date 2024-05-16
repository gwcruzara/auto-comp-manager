import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RampComponent } from './ramp.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RampComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    RampComponent
  ]
})
export class RampModule { }
