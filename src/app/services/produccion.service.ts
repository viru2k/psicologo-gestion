import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';
import { OrdenProduccion } from './../models/orden-produccion.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  private url:string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }

  getProduccion(){
    return this.http.get<any[]>(this.url+'articulos');
    }

  getMaquinas(){
    return this.http.get<any[]>(this.url+'maquina');
    }

  getMaquinaById(id: string){
    return this.http.get<any[]>(this.url+'maquina/id=' + id);
    }

    getProduccionByFecha(articulo_id: string){
    return this.http.get<any[]>(this.url+'articulo/confeccion?articulo_id='+articulo_id);
    }
    
    setProduccion(articulo: any){
      return this.http.post<any[]>(this.url+'articulo/confeccion', articulo);
      }  
    
    setOrdenProduccion(articulo: OrdenProduccion){
      return this.http.post<any[]>(this.url+'produccion/orden/produccion', articulo);
      }  
  

    updateOrdenProduccion( articulo: string,estado: string){
    return this.http.get<any[]>(this.url+'produccion/orden/produccion/estado/editar?id='+articulo+'&estado='+estado);
    }  

    getOrdenProduccionDetalleById(id: string){
      return this.http.get<any[]>(this.url+'produccion/orden/produccion/by/id?id='+id);
    }
    
    getOrdenProduccionDetalleByEstado(estado: string){
      return this.http.get<any[]>(this.url+'produccion/orden/produccion/by/estado?estado='+estado);
    }

      getOrdenProduccionEstado(estado: string){
        return this.http.get<any[]>(this.url+'produccion/orden/produccion/estado?estado='+estado);
    }

    getUnidad(){
      return this.http.get<any[]>(this.url+'unidad');
      }

    setProduccionOrdenProduccion(produccion:any){
      return this.http.post<any>(this.url+'produccion/crear', produccion);
      }

    getProduccionByOrdenProduccion(id: string, articulo_id:string){
      return this.http.get<any[]>(this.url+'produccion/asociar/orden/produccion/articulo?id='+id+'&articulo_id='+articulo_id);
    }

    getProduccionByOrdenProduccionTodos(id: string){
      return this.http.get<any[]>(this.url+'produccion/asociar/orden/produccion/articulo/todos?id='+id);
    }

    getInsumosByArticuloId(id: string) {
      return this.http.get<any[]>(this.url + 'produccion/articulo/insumo?articulo_id=' + id);
    }

    getSector(){
      return this.http.get<any[]>(this.url + 'produccion/sector/carga');
    }
    produccionDetalleByProduccionId(produccion_id: string) {
      return this.http.get<any[]>(this.url + 'produccion/detalle/by/produccion/id?produccion_id=' + produccion_id);
    }

    setProduccionProceso(produccion: any){
      return this.http.post<any>(this.url + 'produccion/proceso/crear', produccion);
      }


}
