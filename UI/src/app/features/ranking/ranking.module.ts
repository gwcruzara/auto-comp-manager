import { NgModule } from '@angular/core';
import { RankingComponent } from './ranking.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RankingRoutingModule } from './ranking-routing.module';


@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RankingRoutingModule
  ],
  exports: [
    RankingComponent
  ]
})
export class RankingModule { }
