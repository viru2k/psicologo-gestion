import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private url:string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }

  getArticulo(){
    return this.http.get<any[]>(this.url + 'articulos/descripcion');
    }

    getArticuloConfeccionByArticuloId(articulo_id: string){
    return this.http.get<any[]>(this.url+'articulo/confeccion?articulo_id='+articulo_id);
    }
    
    setArticuloConfeccion(articulo: any){
      return this.http.post<any[]>(this.url+'articulo/confeccion', articulo);
      }  
    
     setArticulo(articulo: any){
      return this.http.post<any[]>(this.url+'articulos', articulo);
      }  
  

  updateArticulo( articulo: any,id: string){
    return this.http.put<any[]>(this.url+'articulos/'+id, articulo);
    }  


    getUnidad(){
      return this.http.get<any[]>(this.url+'unidad');
      }

      delArticuloProduccion(id: string){        
        return this.http.get<any>(this.url+'articulos/confeccion/borrar?id='+id);
        }  
}
