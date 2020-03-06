import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';
import { OrdenPedido } from '../models/orden-pedido.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  private url:string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }

  getProduccion(){
    return this.http.get<any[]>(this.url+'articulos');
    }

    getProduccionByFecha(articulo_id: string){
    return this.http.get<any[]>(this.url+'articulo/confeccion?articulo_id='+articulo_id);
    }
    
    setProduccion(articulo: any){
      return this.http.post<any[]>(this.url+'articulo/confeccion', articulo);
      }  
    
    setOrdenPedido(articulo: OrdenPedido){
      return this.http.post<any[]>(this.url+'produccion/orden/pedido', articulo);
      }  
  

    updateOrdenPedido( articulo: string,estado: string){
    return this.http.get<any[]>(this.url+'produccion/orden/pedido/estado/editar?id='+articulo+'&estado='+estado);
    }  

    getOrdenPedidoDetalleById(id: string){
      return this.http.get<any[]>(this.url+'produccion/orden/pedido/by/id?id='+id);
    }

      getOrdenPedidoEstado(estado: string){
        return this.http.get<any[]>(this.url+'produccion/orden/pedido/estado?estado='+estado);
    }

    getUnidad(){
      return this.http.get<any[]>(this.url+'unidad');
      }

}
