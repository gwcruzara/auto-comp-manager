import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingStudentComponent } from './ranking-student.component';

const routes: Routes = [
  {
    path: '',
    component: RankingStudentComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingStudentRoutingModule { }
