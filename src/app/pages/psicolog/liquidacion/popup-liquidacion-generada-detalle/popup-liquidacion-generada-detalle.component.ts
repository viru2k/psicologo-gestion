import { Component, OnInit } from '@angular/core';
import { DialogService, MessageService } from 'primeng/api';
import { PsicologoService } from '../../../../services/psicologo.service';
import swal from 'sweetalert2';
import { PopupFacturaDetalleComponent } from './../popup-factura-detalle/popup-factura-detalle.component';

@Component({
  selector: 'app-popup-liquidacion-generada-detalle',
  templateUrl: './popup-liquidacion-generada-detalle.component.html',
  styleUrls: ['./popup-liquidacion-generada-detalle.component.scss']
})
export class PopupLiquidacionGeneradaDetalleComponent implements OnInit {
  userData:any;
  cols: any;
  loading;
  elementos: any[] = [];
  constructor(private miServico: PsicologoService, private messageService: MessageService ,public dialogService: DialogService) {

    this.cols = [

      { field: 'id_liquidacion', header: 'Liq. nº' , width: '50%'} ,
      { field: 'num_comprobante', header: 'Fecha' , width: '25%'},
      {field: 'boton', header: '' , width: '25%'},
   ];

   }

  ngOnInit() {
     this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loadList();
  }

  loadList() {

    this.loading = true;
    console.log('llamando liquidacion');
    try {
        this.miServico.getLiquidacion('1')
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

