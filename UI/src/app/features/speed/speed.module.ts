import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeedComponent } from './speed.component';


@NgModule({
  declarations: [
    SpeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    SpeedComponent
  ]
})
export class SpeedModule { }
