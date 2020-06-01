import { Padron } from './../models/padron.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {


  private url: string  = URL_SERVICIOS + 'padron';
  private url_liquidacion: string  = URL_SERVICIOS;
  constructor(public http: HttpClient) { }


  
  getPadronByObraSocial(consulta: string, valor: string) {
    console.log(this.url + '?consulta=' + consulta + '&valor=' + valor);
    return this.http.get<Padron[]>(this.url + '?consulta=' + consulta + '&valor=' + valor);
    }

    getLiquidacionDetalleObraSocialPagoByPsicologo(data: any) {
    console.log(data);
      return this.http.post<any[]>(URL_SERVICIOS + 'liquidacion/detalle', data);
    }

    actualizarEmail(mat_matricula: string, mat_email: string) {
      return this.http.get<any[]>(this.url + '/correo?mat_matricula=' + mat_matricula + '&mat_email=' + mat_email);
      }

    getItemsObraSocial() {
      return this.http.get<any[]>(this.url + '/obra_social');
      }

    getLiquidacionByPsicologo(id: string) {
    return this.http.get<any[]>(URL_SERVICIOS + 'liquidacion/by/psicologo?mat_matricula=' + id);
    }

   getinformacionPrivado() {
    return this.http.get<any[]>(URL_SERVICIOS + 'informacion/privada');
    }

    getinformacionPublico() {
    return this.http.get<any[]>(URL_SERVICIOS + 'informacion/publica');
    }


      actualizarPassword(token_autorizacion: string, password: string) {
        return this.http.get<any[]>(URL_SERVICIOS + 'generar/password?token_autorizacion=' + token_autorizacion + '&password=' + password);
        }

        getFacturaByMatricula(mat_matricula: string) {
          return this.http.get<any[]>(URL_SERVICIOS + 'informacion/privada/facturacion/by/matricula?mat_matricula=' + mat_matricula);
          }
      getFacturaByLiquidacion(id_liquidacion: string) {
        return this.http.get<any[]>(URL_SERVICIOS + 'informacion/privada/facturacion/by/idliquidacion?id_liquidacion=' + id_liquidacion);
        }

      getLiquidacion(id_liquidacion: string) {
        console.log('llamando');
        return this.http.get<any[]>(URL_SERVICIOS + 'liquidacion/liquidacion/generada');
        }

        postNoticiaPublica(data: any) {
          console.log(data);
            return this.http.post<any[]>(URL_SERVICIOS + 'noticia/publica', data);
          }

        postNoticiaPrivada(data: any) {
          console.log(data);
            return this.http.post<any[]>(URL_SERVICIOS + 'noticia/privada', data);
          }

          putNoticiaPublica(data: any, id: string) {
          console.log(data);
            return this.http.put<any>(URL_SERVICIOS + 'noticia/publica/' + id, data);
          }

          putNoticiaPrivada(data: any, id: string) {
          console.log(data);
            return this.http.put<any>(URL_SERVICIOS + 'noticia/privada/' + id, data);
          }
}
