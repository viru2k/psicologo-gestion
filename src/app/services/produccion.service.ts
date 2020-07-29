import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';
import { OrdenProduccion } from './../models/orden-produccion.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  private url: string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }

  getProduccion() {
    return this.http.get<any[]>(this.url + 'articulos');
    }

  getMaquinas() {
    return this.http.get<any[]>(this.url + 'maquina');
    }

    
  setMaquinas(maquina: any) {
    return this.http.post<any[]>(this.url + 'maquina', maquina);
    }


  updMaquinas(id: string, maquina: any) {
    return this.http.put<any[]>(this.url + 'maquina/' + id, maquina);
    }


  getMaquinaById(id: string) {
    return this.http.get<any[]>(this.url + 'maquina/id=' + id);
    }



  getDepositos() {
    return this.http.get<any[]>(this.url + 'deposito');
    }


  setDepositos(deposito: any) {
    return this.http.post<any[]>(this.url + 'deposito', deposito);
    }



  updDepositos(id: string, deposito: any) {
    return this.http.put<any[]>(this.url + 'deposito/' + id, deposito);
    }


    getProduccionByFecha(articulo_id: string) {
    return this.http.get<any[]>(this.url + 'articulo/confeccion?articulo_id=' + articulo_id);
    }

    setProduccion(articulo: any) {
      return this.http.post<any[]>(this.url + 'articulo/confeccion', articulo);
      }

    setOrdenProduccion(articulo: OrdenProduccion) {
      return this.http.post<any[]>(this.url + 'produccion/orden/produccion', articulo);
      }


    updateOrdenProduccion( articulo: string,estado: string) {
    return this.http.get<any[]>(this.url + 'produccion/orden/produccion/estado/editar?id=' + articulo + '&estado=' + estado);
    }

    getOrdenProduccionDetalleById(id: string) {
      return this.http.get<any[]>(this.url + 'produccion/orden/produccion/by/id?id=' + id);
    }

    getOrdenProduccionDetalleByEstado(estado: string) {
      return this.http.get<any[]>(this.url + 'produccion/orden/produccion/by/estado?estado=' + estado);
    }

      getOrdenProduccionEstado(estado: string) {
        return this.http.get<any[]>(this.url + 'produccion/orden/produccion/estado?estado=' + estado);
    }

    getOrdenProduccionByDates(estado: string, fechaDesde: string, fechaHasta: string) {
      // tslint:disable-next-line: max-line-length
      return this.http.get<any[]>(this.url + 'produccion/orden/produccion/by/dates?estado=' + estado + '&fecha_desde=' + fechaDesde + '&fecha_hasta=' + fechaHasta);
  }


    getUnidad() {
      return this.http.get<any[]>(this.url + 'unidad');
      }

    setUnidad(unidad: any) {
      return this.http.post<any>(this.url + 'unidad', unidad);
    }

    updUnidad( id: string, unidad: any ) {
      return this.http.put<any>(this.url + 'unidad/' + id, unidad);
    }

    setProduccionOrdenProduccion(produccion: any) {
      return this.http.post<any>(this.url + 'produccion/crear', produccion);
      }

      updProduccionEstado(produccion: any, id: string) {
      return this.http.put<any>(this.url + 'produccion/estado/' + id, produccion);
      }

    getProduccionByOrdenProduccion(id: string, articulo_id: string) {
      return this.http.get<any[]>(this.url + 'produccion/asociar/orden/produccion/articulo?id=' + id + '&articulo_id=' + articulo_id);
    }

    getProduccionByOrdenProduccionTodos(id: string) {
      return this.http.get<any[]>(this.url + 'produccion/asociar/orden/produccion/articulo/todos?id=' + id);
    }

    getInsumosByArticuloId(id: string) {
      return this.http.get<any[]>(this.url + 'produccion/articulo/insumo?articulo_id=' + id);
    }

    getSector() {
      return this.http.get<any[]>(this.url + 'produccion/sector/carga');
    }

    produccionDetalleByProduccionId(produccion_id: string) {
      return this.http.get<any[]>(this.url + 'produccion/detalle/by/produccion/id?produccion_id=' + produccion_id);
    }

    setProduccionProceso(produccion: any) {
      return this.http.post<any>(this.url + 'produccion/proceso/crear', produccion);
      }

    updProduccionProceso(id: string, produccion: any) {
      return this.http.put<any>(this.url + 'produccion/proceso/finalizar/' + id, produccion);
      }

    updProduccionDetalleEstado(produccion: any, id: string ) {
      return this.http.put<any>(this.url + 'produccion/detalle/estado/' + id, produccion);
      }
      

      getProduccionProcesoByOrdenProduccionDetalleId(orden_produccion_detalle_id: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<any[]>(this.url + 'produccion/proceso/by/detalle/id?orden_produccion_detalle_id=' + orden_produccion_detalle_id);
      }

      getProduccionProcesoByEstado(estado: string) {
        return this.http.get<any[]>(this.url + 'produccion/proceso/by/estado?estado=' + estado );
      }

      getProduccionProcesoByDates(fecha_desde: string, fecha_hasta: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.get<any[]>(this.url + 'produccion/proceso/by/dates?fecha_desde=' + fecha_desde + '&fecha_hasta=' + fecha_hasta);
      }


}
