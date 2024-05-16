import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamStepRoutingModule } from './exam-step-routing.module';
import { ExamStepComponent } from './exam-step.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RampModule } from '../ramp/ramp.module';


@NgModule({
  declarations: [
    ExamStepComponent
  ],
  imports: [
    CommonModule,
    ExamStepRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RampModule
  ]
})
export class ExamStepModule { }
