
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { PsicologoService } from '../../../services/psicologo.service';

import { DialogService, MessageService } from 'primeng/api';
import { DatePipe, formatDate } from '@angular/common';
import * as jsPDF from 'jspdf';
import { PopupAsociarFacturaComponent } from './popup-asociar-factura/popup-asociar-factura.component';
import { PopupLiquidacionGeneradaDetalleComponent } from './popup-liquidacion-detalle/popup-liquidacion-generada-detalle.component';
import { AlertServiceService } from './../../../services/alert-service.service';
// tslint:disable-next-line: max-line-length



@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  styleUrls: ['./liquidaciones.component.scss']
})
export class LiquidacionesComponent implements OnInit {


  cols: any[];
  loading: boolean;
  elementos: any[] = [];
  matricula: string;
  psicologo: string;
  usu: any;
  navbarOpen;

  constructor(private miServico: PsicologoService, private messageService: MessageService , public dialogService: DialogService, private alertServiceService: AlertServiceService) {

    this.cols = [

      { field: 'id_liquidacion', header: 'Liq. nº' , width: '6%'} ,
      { field: 'os_fecha', header: 'Fecha liq.' , width: '12%'} ,
      { field: 'num_comprobante', header: 'Comp.' , width: '8%'},
      { field: 'os_num_ing_bruto', header: 'Nº I.B' , width: '8%'},
     /*  { field: 'os_liq_bruto', header: 'Bruto' , width: '8%'},
      { field: 'os_desc_fondo_sol', header: 'F. sol',  width: '8%' },
      {field: 'os_desc_matricula', header: 'Matricula' , width: '8%' },
      { field: 'os_gasto_admin', header: 'G. adm.',  width: '8%' },
      { field: 'os_imp_cheque', header: 'Imp. ch,',  width: '8%' },
      { field: 'os_ing_brutos', header: 'Ing. B' , width: '8%'},
      { field: 'os_lote_hogar', header: 'Lote h.' , width: '8%'}, */
      { field: 'os_liq_neto', header: 'A cobrar' , width: '8%'},
      {field: 'boton', header: '', width: '12%' },
      {field: 'boton', header: '' , width: '20%'},
      {field: 'boton', header: '' , width: '18%'},
   ];

  }

  ngOnInit() {

    this.usu  = JSON.parse(localStorage.getItem('userData'));
     console.log(this.usu);
     this.psicologo = this.usu['nombreyapellido'];
     this.matricula = this.usu['username'];
    this.loadList();
  }





  loadList() {
    const userData = JSON.parse(localStorage.getItem('userData'));
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
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
         });
    } catch (error) {
    this.alertServiceService.throwAlert('error', 'Error al cargar los registros', error, error.status);
    }
}



verFactura(event: any) {
 console.log(event);
 let data: any;
 data = event;
 const ref = this.dialogService.open(PopupAsociarFacturaComponent, {
 data,
  header: 'Facturas emitidas',
  width: '98%',
  height: '75%'
 });

 // tslint:disable-next-line: no-shadowed-variable
 ref.onClose.subscribe((PopupAsociarFacturaComponent: any) => {
     if (PopupAsociarFacturaComponent) {
     }
 });

}

 verDetalle(event: any) {
  console.log(event);
  let data: any;
  data = event;
  const ref = this.dialogService.open(PopupLiquidacionGeneradaDetalleComponent, {
  data,
   header: 'Detalle de liquidacion',
   width: '98%',
   height: '100%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupLiquidacionGeneradaDetalleComponent: any) => {
      if (PopupLiquidacionGeneradaDetalleComponent) {
      }
  });
}




 generarPdfRentas(event: any) {
  console.log(event);
  const _fechaEmision = formatDate(event.os_fecha, 'dd/MM/yyyy', 'en');

  const userData = JSON.parse(localStorage.getItem('userData'));

  const doc = new jsPDF();
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
  doc.text('C.U.I.T: ' + event.mat_cuit, pageWidth - 80, 55 );
  doc.text('Nº ing. brutos: ' + event.mat_ning_bto, pageWidth - 80, 60 );
  doc.text('Domicilio: ' + event.mat_domicilio_particular, pageWidth - 80, 65 );
  doc.line(10, 70, pageWidth - 10, 70);
  const imp_retenido = Number(event.os_ing_brutos) + Number(event.os_lote_hogar);
  doc.text('Monto imponible: ' + event.os_liq_bruto, 10, 75 );
  doc.text('Ing. brutos: ' + event.os_ing_brutos, 60, 75 );
  doc.text('Lote hogar: ' + event.os_lote_hogar, 90, 75 );
  doc.text('Importe retenido: ' + imp_retenido, 130, 75 );
  doc.line(10, 80, pageWidth - 10, 80);
  doc.text('DUPLICADO', pageWidth / 2, 85, null, null, 'center');
 window.open(doc.output('bloburl'));

}
}
