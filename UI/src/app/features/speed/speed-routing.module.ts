import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeedComponent } from './speed.component';

const routes: Routes = [
  {
    path: ':id',
    component: SpeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeedRoutingModule { }
