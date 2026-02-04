import { Routes } from '@angular/router';
import { Pokedex } from './pages/pokedex/pokedex';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokedex',
    component: Pokedex,
  },
];
