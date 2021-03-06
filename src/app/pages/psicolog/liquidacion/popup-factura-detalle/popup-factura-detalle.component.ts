import { Component, OnInit } from '@angular/core';
import { DialogService, MessageService, DynamicDialogConfig } from 'primeng/api';
import { PsicologoService } from '../../../../services/psicologo.service';
import swal from 'sweetalert2';
import { URL_ARCHIVO_FACTURA } from './../../../../config/config';

@Component({
  selector: 'app-popup-factura-detalle',
  templateUrl: './popup-factura-detalle.component.html',
  styleUrls: ['./popup-factura-detalle.component.scss']
})
export class PopupFacturaDetalleComponent implements OnInit {
  datos: any;
  userData: any;
  cols: any;
  loading;
  descarga: string;
  elementos: any[] = [];
  constructor(private miServico: PsicologoService, private messageService: MessageService ,public dialogService: DialogService, private config:DynamicDialogConfig) {

    this.cols = [

      { field: 'id_liquidacion', header: 'Liq. nº' , width: '10%'} ,
      { field: 'mat_matricula', header: 'Matrícula' , width: '15%'},
      { field: 'matricula_psicologo', header: 'Psicólogo' , width: '50%'},
      { field: 'fecha_subida', header: 'Subido' , width: '15%'},
      {field: 'boton', header: '' , width: '10%'},
   ];

   }

  ngOnInit() {
    this.descarga = URL_ARCHIVO_FACTURA;
    console.log(this.config.data);
    this.datos = this.config.data;
    //this.userData = JSON.parse(localStorage.getItem('userData'));
    this.elementos = this.datos;
   // this.loadList();
  }

  loadList() {

    this.loading = true;
    console.log('llamando liquidacion');
    try {
        this.miServico.getFacturaByLiquidacion(this.datos['id_liquidacion'])
        .subscribe(resp => {
        this.elementos = resp;
            this.loading = false;
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

verFacturas(event: any){
  console.log(event);

  this.loading = true;
  try {
      this.miServico.getFacturaByLiquidacion(event['id_liquidacion'])
      .subscribe(resp => {
//      this.elementos = resp;
          this.loading = false;
          console.log(resp);

          let data:any; 
          data = resp;
          const ref = this.dialogService.open(PopupFacturaDetalleComponent, {
          data,
           header: 'Detalle de facturas',
           width: '98%',
           height: '75%'
          
          });
        
          ref.onClose.subscribe((PopupFacturaDetalleComponent:any) => {
              if (PopupFacturaDetalleComponent) {
            
              }
          });
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


