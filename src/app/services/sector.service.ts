import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private url: string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }

    getGrupo() {
    return this.http.get<any[]>(this.url + 'grupo');
    }

    getGrupoByIdGrupo(grupo_trabajo_id: string) {
    return this.http.get<any[]>(this.url + 'grupo/usuario?grupo_trabajo_id=' + grupo_trabajo_id);
    }

    setGrupo(item: any ) {
      return this.http.post<any[]>(this.url + 'grupo', item);
    }

    setGrupoTrabajo(item: any) {
    return this.http.post<any[]>(this.url + 'grupo/usuario', item);
    }


    updGrupo(id: string, item: any ) {
    return this.http.put<any[]>(this.url + 'grupo/' + id,  item);
    }

    updGrupoTrabajo( id: string, item: any ) {
      return this.http.put<any>(this.url + 'grupo/usuario/' + id, item);
    }


    delGrupoUsuario( id: string) {
      return this.http.get<any>(this.url + 'grupo/usuario/borrar?id=' + id);
    }


}

