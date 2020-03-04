import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CalidadService {

  private url:string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }


/* -------------------------------------------------------------------------- */
/*                   ENCABEZADO DE LAS PLANILLAS DE CALIDAD                   */
/* -------------------------------------------------------------------------- */

  getCalidadTipoControl(){
    return this.http.get<any[]>(this.url+'calidad');
    }

    getCalidadTipoControlConfeccionByCalidadTipoControlId(articulo_id: string){
    return this.http.get<any[]>(this.url+'calidad/confeccion?articulo_id='+articulo_id);
    }

     setCalidadTipoControl(articulo: any){
      return this.http.post<any[]>(this.url+'calidad/tipocontrol', articulo);
      }  
  

  updateCalidadTipoControl( articulo: any,id: string){
    return this.http.put<any[]>(this.url+'calidad/'+id, articulo);
    }  


    getUnidad(){
      return this.http.get<any[]>(this.url+'unidad');
      }



}
