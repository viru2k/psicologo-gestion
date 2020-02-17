import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';

import { AutorizacionesComponent } from './pages/psicolog/autorizaciones/autorizaciones.component';
import { CursosComponent } from './pages/psicolog/cursos/cursos.component';
import { LiquidacionComponent } from './pages/psicolog/liquidacion/liquidacion.component';
import { MiCuentaComponent } from './pages/psicolog/mi-cuenta/mi-cuenta.component';
import { InicioGestionComponent } from './pages/psicolog/inicio-gestion/inicio-gestion.component';
import { TesoreriaComponent } from './pages/psicolog/tesoreria/tesoreria.component';
import { AsuntosprofesionalesComponent } from './pages/psicolog/secretaria/asuntosprofesionales/asuntosprofesionales.component';
import { RevisoresComponent } from './pages/psicolog/revisores/revisores.component';
import { AutogestionComponent } from './pages/psicolog/autogestion/autogestion.component';
import { SecretariageneralComponent } from './pages/psicolog/secretariageneral/secretariageneral.component';


 




export const ROUTES: Routes = [

    { path: 'inicio', component: InicioGestionComponent },
    { path: 'autorizacion', component: AutorizacionesComponent },
    { path: 'curso', component: CursosComponent },
    { path: 'liquidacion', component: LiquidacionComponent },
    { path: 'cuenta', component: MiCuentaComponent },
    { path: 'tesoreria', component: TesoreriaComponent },
    { path: 'asuntosprofesionales', component: AsuntosprofesionalesComponent },
    { path: 'revisores', component: RevisoresComponent },
    { path: 'gestion', component: AutogestionComponent },
    { path: 'secgral', component: SecretariageneralComponent },
    { path: '404', component: NotFoundComponent },  
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

