import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./features/squad/squad.module').then((m) => m.SquadModule),
  },
  {
    path: 'ramp',
    loadChildren: () => import('./features/ramp/ramp.module').then((m) => m.RampModule),
  },
  {
    path: 'traction',
    loadChildren: () => import('./features/traction/traction.module').then((m) => m.TractionModule),
  },
  {
    path: 'speed',
    loadChildren: () => import('./features/speed/speed.module').then((m) => m.SpeedModule),
  },
  {
    path: 'ranking',
    loadChildren: () => import('./features/ranking/ranking.module').then((m) => m.RankingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
