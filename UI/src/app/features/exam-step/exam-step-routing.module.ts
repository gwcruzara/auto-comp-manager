import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamStepComponent } from './exam-step.component';

const routes: Routes = [
  {
    path: '',
    component: ExamStepComponent
  },
  {
    path: ':id',
    component: ExamStepComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamStepRoutingModule { }
