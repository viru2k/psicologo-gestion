import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from './../../../services/alert-service.service';
import { DialogService, MessageService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from '../../../services/produccion.service';
import { CalidadService } from '../../../services/calidad.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-popup-calidad-parametro-produccion-ingreso',
  templateUrl: './popup-calidad-parametro-produccion-ingreso.component.html',
  styleUrls: ['./popup-calidad-parametro-produccion-ingreso.component.scss']
})
export class PopupCalidadParametroProduccionIngresoComponent implements OnInit {

  elemento:any;
  elementos: any[];
  elementosControl: any[];
  userData: any;
  loading;
  selected: any;
  cols:any;

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService,  private calidadService: CalidadService, public dialogService: DialogService, private messageService: MessageService, private config: DynamicDialogConfig) {

    this.cols = [
      { field: 'parametro', header: 'Parámetro',  width: '35%' },
      { field: 'calidad_valor', header: 'Valor',  width: '20%' },
      { field: 'es_no_conformidad', header: 'No conformidad',  width: '20%' },
      { field: 'tiene_accion_correctiva', header: 'Acción correctiva',  width: '20%' },
      { field: '', header: '',  width: '8%' },
    ];

  }


  ngOnInit() {
    console.log(this.config.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getCalidadControlEncabezado(this.config.data['id']);
  }


  onChangeControl(e: any) {
    console.log(e.target.value);
    this.getCalidadControlParametroControl();

  }


  accion(evt: any, overlaypanel: OverlayPanel, event: any) {
    if (event) {
      this.selected = event;
    }
    console.log(event);
    this.elemento = event;
    overlaypanel.toggle(evt);
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
