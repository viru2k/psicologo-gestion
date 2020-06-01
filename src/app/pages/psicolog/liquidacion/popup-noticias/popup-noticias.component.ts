import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';


import { DialogService, MessageService, DynamicDialogConfig } from 'primeng/api';
import { DatePipe, formatDate } from '@angular/common';

import * as jsPDF from 'jspdf';
import { PsicologoService } from './../../../../services/psicologo.service';
import { URL_ARCHIVO_FACTURA,URL_ARCHIVO, URL_ARCHIVO_VIDEO, URL_ARCHIVO_IMAGEN } from './../../../../config/config';
import { PopupNoticiasNuevoComponent } from './../popup-noticias-nuevo/popup-noticias-nuevo.component';





@Component({
  selector: 'app-popup-noticias',
  templateUrl: './popup-noticias.component.html',
  styleUrls: ['./popup-noticias.component.scss'],
  providers: [MessageService, DialogService]
})
export class PopupNoticiasComponent implements OnInit {

  datos: any;
  userData: any;
  cols: any;
  loading;
  descarga: string;
  elementos: any[] = [];
  busqueda = 'PRIVADA';

  constructor(private miServico: PsicologoService, private messageService: MessageService ,public dialogService: DialogService, private config:DynamicDialogConfig) {

    this.cols = [

      { field: 'pagina', header: 'Página' , width: '20%'} ,
      { field: 'titulo', header: 'Título' , width: '20%'},
      { field: 'descripcion', header: 'Descripción' , width: '40%'},
      { field: 'fecha_subida', header: 'Subido' , width: '15%'},
      {field: 'boton', header: '' , width: '10%'},
   ];

   }

  ngOnInit() {
    this.descarga = URL_ARCHIVO_FACTURA;
    console.log(this.config.data);
    this.datos = this.config.data;
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loadListPrivado();
  }



  editar(elemento: any) {
    console.log(elemento);
    elemento.busqueda = this.busqueda;
    const data: any = elemento;
    
    const ref = this.dialogService.open(PopupNoticiasNuevoComponent, {
    data,
     header: 'Editar noticia',
     width: '60%',
     height: '70%'
    });

    ref.onClose.subscribe((PopupNoticiasNuevoComponent: any) => {
      if (PopupNoticiasNuevoComponent) {
        if (this.busqueda === 'PRIVADA') {
          this.loadListPrivado();
        } else {
          this.loadListPublico();
        }
      }
    });
  }

  subirNoticia() {
    
    const data: any = null;

    const ref = this.dialogService.open(PopupNoticiasNuevoComponent, {
    data,
     header: 'Crear noticia',
     width: '60%',
     height: '70%'
    });
  
    ref.onClose.subscribe((PopupNoticiasNuevoComponent: any) => {
  
      if (PopupNoticiasNuevoComponent) {
        if (this.busqueda === 'PRIVADA') {
          this.loadListPrivado();
        } else {
          this.loadListPublico();
        }
      }
    });
  
  }

  loadListPrivado() {
    this.busqueda = 'PRIVADA';
    this.loading = true;
    try {
        this.miServico.getinformacionPrivado()
        .subscribe(resp => {
        
        let i=0;
        let res = resp;
            resp.forEach(element => {
              //enlaces
              if(res[i]['tiene_enlace']==='SI'){
               res[i]['enlace_abrir'] = URL_ARCHIVO+res[i]['enlace'];
              }
              // videos
              if(res[i]['es_video']==='SI'){
               res[i]['enlace_abrir'] = URL_ARCHIVO_VIDEO+res[i]['enlace_video'];
              }

              if(res[i]['tiene_imagen']==='SI'){
               res[i]['enlace_abrir'] = URL_ARCHIVO_IMAGEN+res[i]['imagen'];
              }
                       
           i++;
          });
            this.loading = false;
            this.elementos = resp;
            console.log(resp);


        },
        error => { // error path
            console.log(error.message);
            console.log(error.status);
            this.loading = false;
            this.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
         });
    } catch (error) {
    this.throwAlert('error' , 'Error al cargar los registros' , error , error.status);
    }
}


loadListPublico() {
  this.busqueda = 'PUBLICA';
  this.loading = true;
  try {
      this.miServico.getinformacionPublico()
      .subscribe(resp => {
        let i=0;
        let res = resp;
            resp.forEach(element => {
              //enlaces
              if(res[i]['tiene_enlace']==='SI'){
               res[i]['enlace_abrir'] = URL_ARCHIVO+res[i]['enlace'];
              }
              // videos
              if(res[i]['es_video']==='SI'){
               res[i]['enlace_abrir'] = URL_ARCHIVO_VIDEO+res[i]['enlace_video'];
              }

              if(res[i]['tiene_imagen']==='SI'){
               res[i]['enlace_abrir'] = URL_ARCHIVO_IMAGEN+res[i]['imagen'];
              }

           i++;
          });
            this.loading = false;
            this.elementos = resp;
          console.log(resp);


      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          this.loading = false;
          this.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
       });
  } catch (error) {
  this.throwAlert('error' , 'Error al cargar los registros' , error , error.status);
  }
}


throwAlert(estado: string, mensaje: string, motivo: string, errorNumero: string) {

  if (estado === 'success') {
       swal({
           type: 'success',
           title: 'Exito',
           text: mensaje
         } );
   }
   if (estado === 'error') {
     if (errorNumero === '422') {
         mensaje = 'Los datos que esta tratando de guardar son iguales a los que ya poseia';
     }
     if (errorNumero === '400 ') {
         mensaje = 'Bad Request ';
     }
     if (errorNumero === '404') {
         mensaje = 'No encontrado ';
     }
     if (errorNumero === '401') {
         mensaje = 'Sin autorización';
     }
     if (errorNumero === '403') {
         mensaje = ' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
     }
     if (errorNumero === '405') {
         mensaje = 'Método no permitido';
     }
     if (errorNumero === '500') {
         mensaje = 'Error interno en el servidor';
     }
     if (errorNumero === '503') {
         mensaje = 'Servidor no disponible';
     }
     if (errorNumero === '502') {
         mensaje = 'Bad gateway';
     }

       swal({
           type: 'error',
           title: 'Oops...',
           text: mensaje,
           footer: motivo
         });
   }
   if (estado === 'alerta') {
     swal({
         type: 'warning',
         title: 'Cuidado!',
         text: mensaje,
         footer: motivo
       });
 }
 }
}



