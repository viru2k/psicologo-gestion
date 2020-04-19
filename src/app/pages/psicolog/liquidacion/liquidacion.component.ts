import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { PsicologoService } from '../../../services/psicologo.service';

import { DialogService, MessageService } from 'primeng/api';
import { DatePipe, formatDate } from '@angular/common';
import { PopupLiquidacionDetalleComponent } from './../../../shared/components/popup/popup-liquidacion-detalle/popup-liquidacion-detalle.component';
import * as jsPDF from 'jspdf';
import { PopupAsociarFacturaComponent } from './popup-asociar-factura/popup-asociar-factura.component';



@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss'],
  providers: [MessageService,DialogService]
})
export class LiquidacionComponent implements OnInit {

  
  cols: any[];
  loading: boolean;
  elementos: any[] = [];
  matricula:string;
  psicologo:string;
  usu:any;
  constructor(private miServico: PsicologoService, private messageService: MessageService ,public dialogService: DialogService) { 

    this.cols = [
              
      { field: 'id_liquidacion', header: 'Liq. nº' , width: '6%'} ,
      { field: 'num_comprobante', header: 'Comprobante' , width: '8%'},
      { field: 'os_liq_bruto', header: 'Bruto' , width: '8%'},
      { field: 'os_desc_fondo_sol', header: 'F. sol',  width: '8%' },
      {field: 'os_desc_matricula', header: 'Matricula' , width: '8%' },
      { field: 'os_descuentos', header: 'Otros',  width: '8%' },      
      { field: 'os_gasto_admin', header: 'Gastos adm.',  width: '8%' },
      { field: 'os_imp_cheque', header: 'Imp. cheque',  width: '8%' },
      { field: 'os_ing_brutos', header: 'Ing. brutos' , width: '8%'},
      { field: 'os_lote_hogar', header: 'Lote h.' , width: '8%'},
      { field: 'os_liq_neto', header: 'A cobrar' , width: '8%'},
      {field: 'boton', header: '', width: '8%' },
      {field: 'boton', header: '' , width: '8%'},
      {field: 'boton', header: '' , width: '12%'},
   ];

  }

  ngOnInit() {
    
    this.usu  = JSON.parse(localStorage.getItem('userData'));
     console.log(this.usu);
     this.psicologo = this.usu['nombreyapellido'];
     this.matricula = this.usu['username'];
    this.loadList();
  }

  navbarOpen = false;

  toggleNavbar() {

    
    console.log(this.navbarOpen);
    this.navbarOpen = !this.navbarOpen;
  }
  isCollapse = false;   // guardamos el valor
  toggleState() { // manejador del evento
      let foo = this.isCollapse;
      this.isCollapse = foo === false ? true : false; 
  }


  
  loadList(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.loading = true;
    try {
        this.miServico.getLiquidacionByPsicologo(userData['username'])
        .subscribe(resp => {
        this.elementos = resp;
            this.loading = false;
            console.log(resp);
        },
        error => { // error path
            console.log(error.message);
            console.log(error.status);
            this.loading = false;
            this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
         });    
    } catch (error) {
    this.throwAlert('error','Error al cargar los registros',error,error.status);
    }  
}



verFactura(event:any){
 console.log(event);
 let data:any; 
 data = event;
 const ref = this.dialogService.open(PopupAsociarFacturaComponent, {
 data,
  header: 'Facturas emitidas', 
  width: '98%',
  height: '75%'
 
 });

 ref.onClose.subscribe((PopupAsociarFacturaComponent:any) => {
     if (PopupAsociarFacturaComponent) {
   
     }
 });

}

 verDetalle(event:any){
  console.log(event);
  let data:any; 
  data = event;
  const ref = this.dialogService.open(PopupLiquidacionDetalleComponent, {
  data,
   header: 'Detalle de liquidacion', 
   width: '98%',
   height: '75%'
  
  });

  ref.onClose.subscribe((PopupLiquidacionDetalleComponent:any) => {
      if (PopupLiquidacionDetalleComponent) {
    
      }
  });
 
}

 



 generarPdfRentas(event:any) {
  console.log(event);
  let _fechaEmision = formatDate(event.os_fecha, 'dd/MM/yyyy', 'en');

  let userData = JSON.parse(localStorage.getItem('userData'));

  
  

  var doc = new jsPDF();  
  /** valores de la pagina**/
  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  doc.setFontSize(9);
  doc.text('DIRECCION GENERAL  DE RENTAS', 10, 15 );
  doc.text('CERTIFICADO DE RETENCION Nº ' + event.os_num_ing_bruto, pageWidth - 80, 15 );
  doc.text('SAN JUAN', 10, 20);
  doc.text('FECHA: ' + _fechaEmision, pageWidth - 80, 20 );
  doc.line(10, 25, pageWidth - 10, 25);
  doc.setFontSize(8);
  doc.text('Impuestos sobre los ingresos brutos', 10, 30 );
  doc.text('COLEGIO DE PSICOLOGOS DE SAN JUAN', 10, 35 );
  doc.text('GRAL. ACHA 1056 SUR', 10, 40 );

  doc.text('AGENTE DE RETENCION 000-39646-7 77', pageWidth - 80, 30 );
  doc.text('C.U.I.T 30-63561825-2', pageWidth - 80, 35 );
  doc.line(10, 43, pageWidth - 10, 43);
  doc.text('VENDEDOR (Apellido y Nombre)', 10, 50 );
  doc.text(event.mat_apellido, 10, 55 );

  doc.text('ACTIVIDAD: Psicologia', pageWidth - 80, 50 );
  doc.text('C.U.I.T: '+event.mat_cuit, pageWidth - 80, 55 );
  doc.text('Nº ing. brutos: '+event.mat_ning_bto, pageWidth - 80, 60 );
  doc.text('Domicilio: '+event.mat_domicilio_partcular, pageWidth - 80, 65 );

  doc.line(10, 70, pageWidth - 10, 70);
  let imp_retenido = Number(event.os_ing_brutos)+Number(event.os_lote_hogar);
  doc.text('Monto imponible: '+event.os_liq_bruto, 10, 75 );
  doc.text('Ing. brutos: '+event.os_ing_brutos, 60, 75 );
  doc.text('Lote hogar: '+event.os_lote_hogar, 90, 75 );
  doc.text('Importe retenido: '+imp_retenido, 130, 75 );
  doc.line(10, 80, pageWidth - 10, 80);
  doc.text('DUPLICADO', pageWidth/2, 85, null, null, 'center');
 window.open(doc.output('bloburl'));  
  
}


throwAlert(estado:string, mensaje:string, motivo:string, errorNumero:string){
  let tipoerror:string;

     if(estado== 'success'){
          swal({
              type: 'success',
              title: 'Exito',
              text: mensaje
            })
      }
      if(estado== 'error'){
        if(errorNumero =='422'){
            mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
        }
        if(errorNumero =='400 '){
            mensaje ='Bad Request ';
        }
        if(errorNumero =='404'){
            mensaje ='No encontrado ';
        }
        if(errorNumero =='401'){
            mensaje ='Sin autorización';
        }
        if(errorNumero =='403'){
            mensaje =' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
        }
        if(errorNumero =='405'){
            mensaje ='Método no permitido';
        }
        if(errorNumero =='500'){
            mensaje ='Error interno en el servidor';
        }
        if(errorNumero =='503'){
            mensaje ='Servidor no disponible';
        }
        if(errorNumero =='502'){
            mensaje ='Bad gateway';
        }

          swal({   
              type: 'error',
              title: 'Oops...',
              text: mensaje,
              footer: motivo
            })
      }
      if(estado== 'alerta'){
        swal({   
            type: 'warning',
            title: 'Cuidado!',
            text: mensaje,
            footer: motivo
          })
    }
    }
}
