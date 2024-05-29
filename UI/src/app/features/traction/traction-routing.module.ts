import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TractionComponent } from './traction.component';

const routes: Routes = [
  {
    path: ':id',
    component: TractionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TractionRoutingModule { }
