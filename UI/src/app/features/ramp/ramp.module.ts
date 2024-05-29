import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RampComponent } from './ramp.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RankingModule } from '../ranking/ranking.module';
import { RampRoutingModule } from './ramp-routing.module';


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
    RankingModule
  ], 
  exports: [
    SharedModule
  ]
})
export class RampModule { }
