import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RampComponent } from './features/ramp/ramp.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./features/squad/squad.module').then((m) => m.SquadModule),
  },
  {
    path: 'exam-step',
    loadChildren: () => import('./features/exam-step/exam-step.module').then((m) => m.ExamStepModule),
  },
  {
    path: 'squad/ramp/:id',
    component: RampComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
