import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquadComponent } from './squad.component';
import { SquadFormComponent } from './components/squad-form/squad-form.component';

const routes: Routes = [
  {
    path: '',
    component: SquadComponent,
  },
  {
    path: 'squad-form',
    component: SquadFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SquadRoutingModule { }
