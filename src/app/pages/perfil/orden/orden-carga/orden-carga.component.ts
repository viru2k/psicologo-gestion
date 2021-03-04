import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, OnInit } from '@angular/core';
import { LiquidacionService } from './../../../../services/liquidacion.service';
import { MessageService, DialogService } from 'primeng/api';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { Filter } from './../../../../shared/filter';
import { ExcelService } from './../../../../services/excel.service';
import { calendarioIdioma } from './../../../../config/config';
import { formatDate } from '@angular/common';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable')

@Component({
  selector: 'app-orden-carga',
  templateUrl: './orden-carga.component.html',
  styleUrls: ['./orden-carga.component.scss']
})
export class OrdenCargaComponent implements OnInit {

  cols: any[];
  es: any;
  loading = false;
  elemento: any[] = null;
  elementos: any[] = [];
  selecteditems: any[] = [];
  selecteditem: any = null;
  elementosFiltrados: any[] = [];
  elementosFiltradosImpresion: any[] = [];
  columns: any;
  userData: any;
  fechaDesde: Date;
  _fechaDesde: string;
  fechaHasta: Date;
  _fechaHasta: string;

  _os_sesion: any[] = [];
  _os_sesion_codigo: any[] = [];
  _os_nombre: any[] = [];

  total_orden = 0;
  total = 0;

  constructor(private liquidacionService: LiquidacionService,
              private messageService: MessageService,
              public dialogService: DialogService,
              private alertServiceService: AlertServiceService,
            private filter: Filter ) {

this.cols = [
{field: 'os_nombre', header: 'Obra social', width: '20%' },
{field: 'os_fecha', header: 'Fecha', width: '12%' },
{field: 'os_sesion', header: 'Sesión', width: '20%' },
{field: 'os_sesion_codigo', header: 'Código', width: '12%' },
{field: 'os_precio_sesion', header: 'Valor', width: '12%' },
{field: 'os_cantidad', header: 'Cant.', width: '8%' },
{field: 'os_precio_total', header: 'Total', width: '12%' },

];

this.columns = [
{title: 'Matrícula', dataKey: 'mat_matricula'},
{title: 'Psicólogo', dataKey: 'mat_nombreyapellido'},
{title: 'Concepto', dataKey: 'mat_concepto'},
{title: 'Descripción', dataKey: 'mat_descripcion'},
{title: 'Valor', dataKey: 'mat_monto'},
{title: 'Importe', dataKey: 'mat_monto_final'},
{title: 'Vencimiento', dataKey: 'mat_fecha_vencimiento'},
{title: 'Cuota', dataKey: 'mat_num_cuota'},
{title: 'Plan', dataKey: 'mat_id_plan'},
{title: 'Estado', dataKey: 'mat_estado'},
{title: 'Punto', dataKey: 'id_usuario'}

]; }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma;
    this.buscarEntreFechas();
  }


  buscarEntreFechas() {
  this.loading = true;

  try {
    this.loading = true;
    this.liquidacionService.getLiquidacionOrdenBetweenDatesByPsicologo( this.userData['username'])
    .subscribe(resp => {
      console.log(resp);
      this.elementos = resp;
      this.loading = false;
      this.realizarFiltroBusqueda(resp);
    },
    error => { // error path
      this.loading = false;
      console.log(error.message);
      console.log(error.status);
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, '');
    });
  } catch (error) {
  this.alertServiceService.throwAlert('error', 'Error al cargar los registros' , error, ' ');
  }

}




generarPdf() {

  let _fechaEmision = formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en');
  console.log(this.selecteditems);
  //if (!this.selecteditems) {

    //let fecha = formatDate(this.fec, 'dd/MM/yyyy', 'en');
  var doc = new jsPDF('landscape');

  const pageSize = doc.internal.pageSize;
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  let img = new Image();
  img.src = './assets/images/user-default.png';
  doc.addImage(img, 'PNG', 5, 5, 18, 18, undefined, 'FAST');

  doc.setLineWidth(0.4);
  doc.line(10, 30, pageWidth - 10, 30);
  doc.setFontSize(12);
  doc.text('Listado de deuda', pageWidth / 2, 20, null, null, 'center');
  doc.text('Emitido : ' + _fechaEmision, pageWidth / 2, 24, null, null, 'center');
  doc.setFontSize(8);
  //doc.text(pageWidth-60, 20, 'Agenda del dia :' + fecha);
  doc.autoTable(this.columns, this.selecteditems,
        {
          margin: {horizontal: 5, vertical: 35},
          bodyStyles: {valign: 'top'},
          styles: {fontSize: 7,cellWidth: 'wrap', rowPageBreak: 'auto', halign: 'justify'},
          columnStyles: {text: {cellWidth: 'auto'}}
        }
        );
  window.open(doc.output('bloburl'));

}



filtered(event){
  console.log(event.filteredValue);
  this.elementosFiltrados  = event.filteredValue;
  this.sumarValores(this.elementosFiltrados);
}


sumarValores(vals:any){
  let i:number;
  console.log(vals);
  //console.log(vals[1]['valor_facturado']);
  console.log(vals !== undefined);
  this.total_orden = 0;
  this.total = 0;

  for (i = 0; i < vals.length; i++) {
      this.total_orden = this.total_orden + Number(vals[i]['os_cantidad']);
      this.total = this.total + Number(vals[i]['os_precio_total']);

  }

}



realizarFiltroBusqueda(resp: any[]) {
  // FILTRO LOS ELEMENTOS QUE SE VAN USAR PARA FILTRAR LA LISTA
  this._os_sesion = [];
  this._os_sesion_codigo = [];
  this._os_nombre = [];
  resp.forEach(element => {
    this._os_sesion.push(element.os_sesion);
    this._os_sesion_codigo.push(element.os_sesion_codigo);
    this._os_nombre.push(element.os_nombre);
    /** SUMO LO FILTRADO */
  });
  // ELIMINO DUPLICADOS
  this._os_sesion = this.filter.filterArray(this._os_sesion);
  this._os_sesion_codigo = this.filter.filterArray(this._os_sesion_codigo);
  this._os_nombre = this.filter.filterArray(this._os_nombre);
}



}
