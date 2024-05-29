import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TractionComponent } from './traction.component';
import {  RankingModule } from '../ranking/ranking.module';
import { TractionRoutingModule } from './traction-routing.module';


@NgModule({
  declarations: [
    TractionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TractionRoutingModule,
    ReactiveFormsModule,
    RankingModule
  ],
  exports: [
    SharedModule
  ]
})
export class TractionModule { }
