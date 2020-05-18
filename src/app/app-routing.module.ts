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
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';
import { OrdenPedidoIngresoComponent } from './pages/produccion/orden-pedido-ingreso/orden-pedido-ingreso.component';
import { OrdenPedidoComponent } from './pages/produccion/orden-pedido/orden-pedido.component';
import { MovimientoProduccionComponent } from './pages/produccion/movimiento-produccion/movimiento-produccion.component';
import { IngresoProduccionComponent } from './pages/produccion/ingreso-produccion/ingreso-produccion.component';
import { OrdenProduccionComponent } from './pages/produccion/orden-produccion/orden-produccion.component';
import { UnidadComponent } from './pages/mantenimiento/unidad/unidad.component';
import { GrupoTrabajoComponent } from './pages/mantenimiento/grupo-trabajo/grupo-trabajo.component';
import { GrupoTrabajoEditarComponent } from './pages/mantenimiento/grupo-trabajo-editar/grupo-trabajo-editar.component';
import { GrupoTrabajoAsociarComponent } from './pages/mantenimiento/grupo-trabajo-asociar/grupo-trabajo-asociar.component';
import { ProduccionProcesoComponent } from './pages/produccion/produccion-proceso/produccion-proceso.component';
import { MaquinaComponent } from './pages/mantenimiento/maquina/maquina.component';
import { AsociarInsumoAltaComponent } from './pages/produccion/asociar-insumo/asociar-insumo-alta/asociar-insumo-alta.component';
import { InsumoAltaComponent } from './pages/insumo/insumo-alta/insumo-alta.component';

import { CalidadControlEncabezadoComponent } from './pages/mantenimiento/calidad/calidad-control-encabezado/calidad-control-encabezado.component';
import { CalidadControlParametroComponent } from './pages/mantenimiento/calidad/calidad-control-parametro/calidad-control-parametro.component';
import { CalidadControlEncabezadoParametroComponent } from './pages/mantenimiento/calidad/calidad-control-encabezado-parametro/calidad-control-encabezado-parametro.component';

const routes: Routes = [

{ path: 'inicio', component: EmptyComponent },



/* -------------------------------------------------------------------------- */
/*                                MANTENIMIENTO                               */
/* -------------------------------------------------------------------------- */

{ path: 'mantenimiento/articulo', component: ArticuloComponent },
{ path: 'mantenimiento/articulo/confeccion', component: ArticuloConfeccionComponent },
{ path: 'mantenimiento/unidad', component: UnidadComponent },
{ path: 'mantenimiento/insumo', component: InsumoComponent },
{ path: 'mantenimiento/grupo', component: GrupoTrabajoComponent },
{ path: 'usuario', component: UsuarioComponent },
{ path: 'mantenimiento/maquina', component: MaquinaComponent },

{ path: 'mantenimiento/calidad/encabezado', component: CalidadControlEncabezadoComponent },
{ path: 'mantenimiento/calidad/parametro', component: CalidadControlParametroComponent },
{ path: 'mantenimiento/calidad/encabezado/parametro', component: CalidadControlEncabezadoParametroComponent },

/* -------------------------------------------------------------------------- */
/*                                   CALIDAD                                  */
/* -------------------------------------------------------------------------- */

{ path: 'calidad/indicadores', component: CalidadindicadoresComponent },

/* -------------------------------------------------------------------------- */
/*                                 PRODUCCION                                 */
/* -------------------------------------------------------------------------- */

{ path: 'produccion/indicadores', component: ProduccionindicadoresComponent },
{ path: 'orden/produccion', component: OrdenProduccionComponent },
{ path: 'orden/produccion/estado', component: OrdenPedidoComponent },
{ path: 'produccion/ingreso', component: IngresoProduccionComponent },
{ path: 'produccion/movimientos', component: MovimientoProduccionComponent },
{ path: 'produccion/asociar/insumo', component: AsociarInsumoAltaComponent },
{ path: 'produccion/proceso', component: ProduccionProcesoComponent },


/* -------------------------------------------------------------------------- */
/*                                   INSUMOS                                  */
/* -------------------------------------------------------------------------- */
{ path: 'insumo/stock/ingreso', component: InsumoAltaComponent },


/* -------------------------------------------------------------------------- */
/*                              PAGINAS DEL SITIO                             */
/* -------------------------------------------------------------------------- */

{ path: '404', component: NotFoundComponent },    
{ path: '', pathMatch: 'full', redirectTo: 'inicio' },
{ path: '**', pathMatch: 'full', redirectTo: 'inicio' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],


















exports: [RouterModule]
})
export class AppRoutingModule { 

}
