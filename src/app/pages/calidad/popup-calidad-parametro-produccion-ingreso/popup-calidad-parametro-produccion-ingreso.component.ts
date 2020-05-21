import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from './../../../services/alert-service.service';
import { DialogService, MessageService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from '../../../services/produccion.service';
import { CalidadService } from '../../../services/calidad.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { calendarioIdioma } from '../../../config/config';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-popup-calidad-parametro-produccion-ingreso',
  templateUrl: './popup-calidad-parametro-produccion-ingreso.component.html',
  styleUrls: ['./popup-calidad-parametro-produccion-ingreso.component.scss']
})
export class PopupCalidadParametroProduccionIngresoComponent implements OnInit {

  procesoProduccionId: string;
  elemento: any;
  elementos: any[];
  elementosControl: any[];
  userData: any;
  loading;
  selected: any;
  selectedElemento: any;
  cols: any;
  display;
  valorObtenido = 0;
  estadoNoConformidad;
  noConformidad: string;
  accionCorrectiva: string;
  estadoAccionCorrectiva;
  hora: Date;
  fecha: Date;
  es: any;
  elementoFinal: any[] = [];

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService,  private calidadService: CalidadService, public dialogService: DialogService, private messageService: MessageService, private config: DynamicDialogConfig) {

    this.cols = [
      { field: 'parametro', header: 'Parámetro',  width: '35%' },
      { field: 'calidad_valor', header: 'Valor',  width: '12%' },
      { field: 'es_no_conformidad_descripcion', header: 'No conformidad',  width: '30%' },
      { field: 'tiene_accion_correctiva_descripcion', header: 'Acción correctiva',  width: '30%' },
      { field: '', header: '',  width: '8%' },
    ];

  }


  ngOnInit() {
    this.procesoProduccionId = this.config.data.id;
    this.es = calendarioIdioma;
    this.hora = new Date();
    this.fecha = new Date();
    console.log(this.config.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getCalidadControlEncabezado(this.config.data['id']);
  }


  onChangeControl(e: any) {
    console.log(e.target.value);
    this.getCalidadControlParametroControl();

  }

  confirmarParametro() {
    this.display = false;
    this.elemento.calidad_valor = this.valorObtenido;
    this.elemento.tiene_accion_correctiva_descripcion = this.accionCorrectiva;
    this.elemento.es_no_conformidad_descripcion =  this.noConformidad;
    if (this.estadoNoConformidad) { 
      this.elemento.no_conformidad =  'SI';
    } else {
      this.elemento.no_conformidad =  'NO';
    }

    if (this.estadoAccionCorrectiva) { 
      this.elemento.es_accion_correctiva = 'SI';
    } else {
      this.elemento.es_accion_correctiva = 'NO';
    }
    this.estadoAccionCorrectiva = false;
    this.accionCorrectiva = '';
    this.estadoNoConformidad = false;
    this.noConformidad = '';
    this.valorObtenido = 0;
    console.log(this.elemento);
  }

  guardarControl() {
    let i = 0;
    this.elementos.forEach(elemento => {

      if (elemento.calidad_valor) {
        const fecha = formatDate(new Date(this.fecha), 'yyyy-MM-dd', 'en') + ' ' +  formatDate(new Date(this.hora), 'HH:mm', 'en') ;
        elemento.fecha = fecha;
        elemento.produccion_proceso_id  = this.procesoProduccionId;
        this.elementoFinal[i] = elemento;
        i++;
     //   console.log(fecha);
      }
    }

      );
      console.log(this.elementoFinal);

  }

  changeNoConformidad(event) {
    console.log(event);
  }

  changeAccionCorrectiva(event) {
    console.log(event);
  }

  accion(evt: any, event: any) {
    if (event) {
     // this.selectedElemento = event;
    }
    console.log(event);
    this.elemento = event;
    this.display = true;
  }


  getCalidadControlEncabezado(produccion: any) {
    console.log(produccion);
    this.loading = true;
    try {
         this.calidadService.getCalidadControlEncabezado()
         .subscribe(resp => {
           if (resp[0]) {
             this.elementosControl = resp;
             console.log(this.elementosControl);
               } else {
                 this.elementosControl = null;
               }
           this.loading = false;
           console.log(resp);
         },
         error => { // error path
             console.log(error);
             this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
          });
     } catch (error) {
       this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
     }
 }



 getCalidadControlParametroControl() {

  console.log(this.selected);
  this.loading = true;
  try {
       this.calidadService.getCalidadControlParametroControl(this.selected.id)
       .subscribe(resp => {
         if (resp[0]) {
           this.elementos = resp;
           console.log(this.elementos);
             } else {
               this.elementos = null;
             }
         this.loading = false;
         console.log(resp);
       },
       error => { // error path
           console.log(error);
           this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
        });
   } catch (error) {
     this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
   }
}




nuevaProduccion(_elemento: any) {
  /* console.log(this.elemento);
  _elemento.es_nuevo = true;
  this.elemento.checked = true;
  this.elemento.checked_iniciado = true;
  let data: any;
  data = this.elemento;
  const ref = this.dialogService.open(PopupAsociarProduccionComponent, {
  data,
   header: 'Gestionar produccion',
   width: '70%',
   height: '80%'
  });

  ref.onClose.subscribe((PopupAsociarProduccionComponent: any) => {

    this.loadlist(this.config.data['id']);
  }); */

 }



detalleProduccion(_elemento: any) {
 /* console.log(this.elemento);
 _elemento.es_nuevo = true;
 this.elemento.checked = true;
 this.elemento.checked_iniciado = true;
 let data: any;
 data = this.elemento;
 const ref = this.dialogService.open(PopupOrdenProduccionDetalleConsultaComponent, {
 data,
  header: 'Gestionar produccion',
  width: '70%',
  height: '80%'
 });

 ref.onClose.subscribe((PopupAsociarProduccionComponent: any) => {

   this.loadlist(this.config.data['id']);
 });
 */
}


 estadistica(elemento: any) {

}

colorRow(estado: string) {

  if (estado === 'ACTIVO') {
    return {'border-es-activo'  : 'null' };
  }
  if (estado === 'PAUSADO') {
    return {'border-es-pausado'  : 'null' };
  }
  if (estado === 'CANCELADO') {
    return {'border-es-cancelado'  : 'null' };
  }
  if (estado === 'FINALIZADO') {
    return {'border-es-finalizado'  : 'null' };
  }
}


iconoColor(estado: string) {

  if (estado === 'ACTIVO') {
    return {'icono-success'  : 'null' };
  }
  if (estado === 'PAUSADO') {
    return {'icono-warning'  : 'null' };
  }
  if (estado === 'CANCELADO') {
    return {'icono-danger'  : 'null' };
  }
  if (estado === 'FINALIZADO') {
    return {'icono-secondary'  : 'null' };
  }
}

}
