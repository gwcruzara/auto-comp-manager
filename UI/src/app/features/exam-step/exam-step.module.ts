import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamStepRoutingModule } from './exam-step-routing.module';
import { ExamStepComponent } from './exam-step.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RampModule } from '../ramp/ramp.module';
import { SpeedModule } from '../speed/speed.module';
import { TractionModule } from '../traction/traction.module';


@NgModule({
  declarations: [
    ExamStepComponent
  ],
  imports: [
    CommonModule,
    ExamStepRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RampModule,
    SpeedModule,
    TractionModule
  ]
})
export class ExamStepModule { }
