import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from './../../../../services/produccion.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { calendarioIdioma } from './../../../../config/config';
import { OrdenProduccionDetalle } from './../../../../models/orden-produccion-detalle.model';
import { PopupAsociarProduccionComponent } from './popup-asociar-produccion/popup-asociar-produccion.component';
import { PopupCalculdorPalletsComponent } from './../../../../shared/components/popups/popup-calculdor-pallets/popup-calculdor-pallets.component';
import { OverlayPanel } from 'primeng/overlaypanel';
import { PopupAsociarProduccionDetalleComponent } from './popup-asociar-produccion-detalle/popup-asociar-produccion-detalle.component';


@Component({
  selector: 'app-popup-orden-produccion-detalle-consulta',
  templateUrl: './popup-orden-produccion-detalle-consulta.component.html',
  styleUrls: ['./popup-orden-produccion-detalle-consulta.component.scss']
})
export class PopupOrdenProduccionDetalleConsultaComponent implements OnInit {

  elementos: any[];
  userData: any;
  loading;
  selected: any;
  cols:any;

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService, public dialogService: DialogService, private messageService: MessageService, private config: DynamicDialogConfig) {

    this.cols = [
      { field: 'id', header: 'Prod Nª',  width: '7.5%' },
      { field: 'estado', header: 'Estado',  width: '8%' },
      { field: 'fecha_produccion', header: 'Creado',  width: '15%' },
      { field: 'nombre', header: 'Descripción',  width: '30%' },
      { field: 'cantidad_solicitada', header: 'Solicitado',  width: '12%' },
      { field: 'cantidad_usada', header: 'Usada',  width: '12%' },
      { field: 'cantidad_existente', header: 'Existente',  width: '12%' },
      { field: '', header: 'Pallets',  width: '12%' },
      { field: '', header: 'Pack',  width: '12%' },
      { field: '', header: '',  width: '6%' },
    ];
   
  }


  ngOnInit() {
    console.log(this.config.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loadlist(this.config.data['id']);
  }

  accion(evt: any, overlaypanel: OverlayPanel, event: any) {
    if (event) {
      this.selected = event;
    }
    console.log(event);
    overlaypanel.toggle(evt);
  }

  loadlist(produccion: any) {
    console.log(produccion);
    this.loading = true;
    try {
         this.produccionService.produccionDetalleByProduccionId(produccion)
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



 calcular(_elemento: any, calculo: string) {
  _elemento.a_calcular = calculo;
  const data: any = _elemento;
  const ref1 = this.dialogService.open(PopupCalculdorPalletsComponent, {
  data,
   header: 'Calcular cantidad',
   width: '60%',
   height: '60%'
  });

  ref1.onClose.subscribe((PopupCalculdorPalletsComponent: any) => {

        if (PopupCalculdorPalletsComponent) {
          
     //     console.log(PopupCalculdorPalletsComponent);
     //     console.log(PopupCalculdorPalletsComponent[0]['unidades']);
       // const resultado =  this.elementos.findIndex(x => x.id === _elemento.id);
     //  this.elementos[resultado]['cantidad'] = PopupCalculdorPalletsComponent[0]['unidades'];
       
        }
  });

 }

 agregarProduccion(elemento: any) {

 }

 nuevaProduccion(elemento: any) {
  console.log(elemento);
  elemento.es_nuevo = true;
  let data: any;
  data = elemento;
  const ref = this.dialogService.open(PopupAsociarProduccionComponent, {
  data,
   header: 'Gestionar produccion',
   width: '70%',
   height: '80%'
  });

  ref.onClose.subscribe((PopupAsociarProduccionComponent: any) => {

    this.loadlist(this.config.data['id']);
  });

 }

 
 detalleProduccion(elemento: any) {
  console.log(elemento);
  let data: any;
  data = elemento;
  const ref = this.dialogService.open(PopupAsociarProduccionDetalleComponent, {
  data,
   header: 'Detalle de producciones',
   width: '98%',
   height: '80%'
  });

  ref.onClose.subscribe((PopupAsociarProduccionDetalleComponent: any) => {
        //this.loadlist();
  });

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
