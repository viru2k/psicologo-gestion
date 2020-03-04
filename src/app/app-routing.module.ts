import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';
import { ProduccionindicadoresComponent } from './pages/produccion/produccionindicadores/produccionindicadores.component';
import { CalidadindicadoresComponent } from './pages/calidad/calidadindicadores/calidadindicadores.component';

import { ArticuloComponent } from './pages/mantenimiento/articulo/articulo.component';
import { ArticuloConfeccionComponent } from './pages/mantenimiento/articulo-confeccion/articulo-confeccion.component';
import { InsumoComponent } from './pages/mantenimiento/insumo/insumo.component';
import { CalidadControlComponent } from './pages/mantenimiento/calidad/calidad-control/calidad-control.component';
import { CalidadTipoControlComponent } from './pages/mantenimiento/calidad/calidad-tipo-control/calidad-tipo-control.component';
import { CalidadDatoRelevadoComponent } from './pages/mantenimiento/calidad/calidad-dato-relevado/calidad-dato-relevado.component';
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';

const routes: Routes = [
  
{ path: 'inicio', component: EmptyComponent },



/* -------------------------------------------------------------------------- */
/*                                MANTENIMIENTO                               */
/* -------------------------------------------------------------------------- */

{ path: 'mantenimiento/articulo', component: ArticuloComponent },
{ path: 'mantenimiento/articulo/confeccion', component: ArticuloConfeccionComponent },
{ path: 'mantenimiento/insumo', component: InsumoComponent },
{ path: 'calidad/encabezado', component: CalidadTipoControlComponent },
{ path: 'calidad/planilla', component: CalidadControlComponent },
{ path: 'calidad/columnas', component: CalidadDatoRelevadoComponent },
{ path: 'usuario', component: UsuarioComponent },

/* -------------------------------------------------------------------------- */
/*                                   CALIDAD                                  */
/* -------------------------------------------------------------------------- */

{ path: 'calidad/indicadores', component: CalidadindicadoresComponent },

/* -------------------------------------------------------------------------- */
/*                                 PRODUCCION                                 */
/* -------------------------------------------------------------------------- */

{ path: 'produccion/indicadores', component: ProduccionindicadoresComponent },

/* -------------------------------------------------------------------------- */
/*                              PAGINAS DEL SITIO                             */
/* -------------------------------------------------------------------------- */

{ path: '404', component: NotFoundComponent },    
{ path: '', pathMatch: 'full', redirectTo: 'inicio' },
{ path: '**', pathMatch: 'full', redirectTo: 'inicio' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],








exports: [RouterModule]
})
export class AppRoutingModule { 

}
