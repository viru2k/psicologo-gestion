import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

import { NotFoundComponent } from './pages/info/not-found/not-found.component';

import { CursosComponent } from './pages/psicolog/cursos/cursos.component';
import { MiCuentaComponent } from './pages/psicolog/mi-cuenta/mi-cuenta.component';










export const ROUTES: Routes = [

    { path: 'curso', component: CursosComponent },
    { path: 'cuenta', component: MiCuentaComponent },
    { path: '404', component: NotFoundComponent },
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

