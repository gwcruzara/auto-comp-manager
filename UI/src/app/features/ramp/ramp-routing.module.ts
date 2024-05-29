import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RampComponent } from './ramp.component';

const routes: Routes = [
  {
    path: ':id',
    component: RampComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RampRoutingModule { }
