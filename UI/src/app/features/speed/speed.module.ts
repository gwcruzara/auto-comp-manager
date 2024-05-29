import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeedComponent } from './speed.component';
import { RankingModule } from '../ranking/ranking.module';
import { SpeedRoutingModule } from './speed-routing.module';


@NgModule({
  declarations: [
    SpeedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SpeedRoutingModule,
    ReactiveFormsModule,
    RankingModule
  ],
  exports: [
    SharedModule
  ]
})
export class SpeedModule { }
