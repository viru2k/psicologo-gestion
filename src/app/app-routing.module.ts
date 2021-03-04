import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { NotFoundComponent } from './pages/info/not-found/not-found.component';

import { LoginComponent } from './login/login.component';

import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { InformacionComponent } from './pages/informacion/informacion.component';

import { AsuntosprofesionalesComponent } from './pages/secretaria/asuntosprofesionales/asuntosprofesionales.component';
import { SocialComponent } from './pages/secretaria/social/social.component';
import { GeneralComponent } from './pages/secretaria/general/general.component';
import { CientificaComponent } from './pages/secretaria/cientifica/cientifica.component';
import { TesoreriaComponent } from './pages/tesoreria/tesoreria.component';
import { RevisoresComponent } from './pages/revisores/revisores.component';
import { AutorizacionesComponent } from './pages/autorizaciones/autorizaciones.component';
import { FacturacionComponent } from './pages/perfil/facturacion/facturacion.component';
import { LiquidacionesComponent } from './pages/perfil/liquidaciones/liquidaciones.component';
import { OrdenCargaComponent } from './pages/perfil/orden/orden-carga/orden-carga.component';

import { FacturacionPsicologoComponent } from './pages/mantenimiento/facturacion-psicologo/facturacion-psicologo.component';
import { NoticiasComponent } from './pages/mantenimiento/noticias/noticias.component';
import { UsuarioCuentaComponent } from './pages/mantenimiento/usuario-cuenta/usuario-cuenta.component';

const routes: Routes = [





/* -------------------------------------------------------------------------- */
/*                              PAGINAS DEL SITIO                             */
/* -------------------------------------------------------------------------- */
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '',
    component: NavbarComponent,
    children: [



/* -------------------------------------------------------------------------- */
/*                                MANTENIMIENTO                               */
/* -------------------------------------------------------------------------- */


{ path: '', component: InformacionComponent },
{ path: 'secretaria/asuntosprofesionales', component: AsuntosprofesionalesComponent },
{ path: 'secretaria/social', component: SocialComponent },
{ path: 'secretaria/general', component: GeneralComponent },
{ path: 'secretaria/cientifica', component: CientificaComponent },
{ path: 'tesoreria', component: TesoreriaComponent },
{ path: 'revisores', component: RevisoresComponent },

{ path: 'autorizacion', component: AutorizacionesComponent },
{ path: 'perfil/facturacion', component: FacturacionComponent },
{ path: 'perfil/liquidaciones', component: LiquidacionesComponent },
{ path: 'perfil/orden', component: OrdenCargaComponent },

{ path: 'gestion/noticias', component: NoticiasComponent },
{ path: 'gestion/facturacion/psicologos', component: FacturacionPsicologoComponent },

{ path: 'cuenta', component: UsuarioCuentaComponent },


    ]
 },
  { path: '**', component: NavbarComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],



























exports: [RouterModule]
})
export class AppRoutingModule { 

}
