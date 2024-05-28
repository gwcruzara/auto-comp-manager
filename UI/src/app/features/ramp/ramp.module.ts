import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RampComponent } from './ramp.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RampRoutingModule } from './ramp-routing.module';
import { ExamStepModule } from '../exam-step/exam-step.module';


@NgModule({
  declarations: [
    RampComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RampRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ExamStepModule
  ],
  exports: [
    RampComponent
  ]
})
export class RampModule { }
