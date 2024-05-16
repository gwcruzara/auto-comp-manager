import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquadRoutingModule } from './squad-routing.module';
import { SquadComponent } from './squad.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    SquadComponent
  ],
  imports: [
    CommonModule,
    SquadRoutingModule,
    SharedModule
  ]
})
export class SquadModule { }
