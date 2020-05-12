import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  private url: string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }

  getInsumo() {
    return this.http.get<any[]>(this.url + 'insumos');
  }


  setInsumo(articulo: any) {
    return this.http.post<any[]>(this.url + 'insumos', articulo);
  }

  updateInsumo( articulo: any, id: string) {
    return this.http.put<any[]>(this.url + 'insumos/' + id, articulo);
  }


    getUnidad() {
      return this.http.get<any[]>(this.url + 'unidad');
    }

  getInsumoByArticulo(articulo_id: string) {
    return this.http.get<any[]>(this.url + 'insumos/by/articulo?articulo_id=' + articulo_id);
  }

  getStockInsumoByEstado(estado: string) {
    return this.http.get<any[]>(this.url + 'insumos/stock/by/estado?estado=' + estado);
  }

  getStockMovimientoByInsumoAndEstado(estado: string, insumo_id: string) {
    return this.http.get<any[]>(this.url + 'insumos/stock/by/estado/insumo?estado=' + estado + '&insumo_id=' + insumo_id);
  }

  getStockMovimientoByEstadoConExistencia(estado: string) {
    return this.http.get<any[]>(this.url + 'insumos/stock/by/estado/insumo/existencia?estado=' + estado);
  }

}


