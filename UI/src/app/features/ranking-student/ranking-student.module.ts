import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingStudentComponent } from './ranking-student.component';
import { RankingStudentRoutingModule } from './ranking-student-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    RankingStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RankingStudentRoutingModule
  ]
})
export class RankingStudentModule { }
