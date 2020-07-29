import { Component, OnInit } from '@angular/core';

import { MessageService, DynamicDialogConfig, DialogService } from 'primeng/api';

import { OverlayPanel } from 'primeng/overlaypanel';

import { formatDate } from '@angular/common';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { ProduccionService } from './../../../../services/produccion.service';
import { calendarioIdioma } from './../../../../config/config';
import { OrdenProduccionDetalle } from './../../../../models/orden-produccion-detalle.model';
import { AsociarInsumoComponent } from './../../popups/popup/asociar-insumo/asociar-insumo.component';
import { OrdenProduccion } from './../../../../models/orden-produccion.model';
import { PopupAsociarProduccionComponent } from './../../ingreso-produccion/popup-orden-produccion-detalle-consulta/popup-asociar-produccion/popup-asociar-produccion.component';


/* -------------------------------------------------------------------------- */
/*                 ASOCIAR INSUMOS A UNA PRODUCCION REALIZADA                 */
/* -------------------------------------------------------------------------- */

@Component({
  selector: 'app-asociar-insumo-alta',
  templateUrl: './asociar-insumo-alta.component.html',
  styleUrls: ['./asociar-insumo-alta.component.scss']
})
export class AsociarInsumoAltaComponent implements OnInit {

  editar;
  fecha_creacion: Date;
  _fecha_creacion: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  _fecha_desde: string;
  _fecha_hasta: string;
  descripcion: string;
  obesrvacion: string;
  fecha: Date;
  es: any;
  cols: any[];
  columns: any[];
  elementos: OrdenProduccionDetalle[] = [];
  ordenProduccion: OrdenProduccion = null;
  selecteditems: any;
  loading;
  userData: any;
  estado: any[] = [];
  selectedEstado: string = 'ACTIVO' ;
  selectedItem: any;

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService, public dialogService: DialogService, private messageService: MessageService) {

    this.cols = [                  
      { field: 'orden_produccion_detalle_id', header: 'Prod Nº',  width: '7.5%' },
      { field: 'estado', header: 'Estado',  width: '12%' },
      { field: 'fecha_produccion', header: 'A producir en',  width: '18%' },
      { field: 'lote', header: 'Lote',  width: '18%' },
      { field: 'nombre', header: 'Producto',  width: '30%' },
      { field: 'maquina_nombre', header: 'Máquina',  width: '18%' },
      { field: 'hora_inicio', header: 'Inicio',  width: '8%' },
      { field: 'hora_fin', header: 'Fin',  width: '8%' },
      { field: 'cantidad_solicitada', header: 'Solicitado',  width: '10%' },
      { field: '', header: 'En packs',  width: '10%' },
      { field: 'cantidad_producida', header: 'Realizado',  width: '10%' },
      { field: '', header: 'En packs',  width: '10%' },
      { field: '', header: '',  width: '6%' },
    ];
   


    this.estado = [
    {name: 'ACTIVO',      value: 'ACTIVO'},
    {name: 'PAUSADO',     value: 'PAUSADO'},
    {name: 'FINALIZADO',  value: 'FINALIZADO'},
    {name: 'CANCELADO',   value: 'CANCELADO'}
];
   }

  ngOnInit() {

    this.es = calendarioIdioma  ;
    this.fecha_creacion = new Date();
    this.fecha_desde = new Date();
    this.fecha_hasta = new Date();
    this.loadlist();
  }

  accion(evt: any, overlaypanel: OverlayPanel, event: any) {
    if (event) {
      this.selectedItem = event;
    }
    console.log(event);
    this.selectedItem = event;
    overlaypanel.toggle(evt);
  }

  
  onChangeEstado(e) {
    console.log(e.target.value);
    this.selectedEstado = e.target.value;
    this.loadlist();
  }

   loadlist() {
    console.log(this.selectedEstado);
    this.loading = true;
    try {
         this.produccionService.getProduccionProcesoByEstado(this.selectedEstado)
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


 buscarByDates() {
  console.log(this.selectedEstado);
  this._fecha_desde = formatDate(new Date(this.fecha_desde), 'yyyy-MM-dd HH:mm', 'en');
  this._fecha_hasta = formatDate(new Date(this.fecha_hasta), 'yyyy-MM-dd HH:mm', 'en');
  this.loading = true;
  try {
       this.produccionService.getProduccionProcesoByDates(this._fecha_desde, this._fecha_hasta)
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

 finalizarProduccion(elemento: any) {
  console.log(elemento);
  this.selectedItem.checked = true;
  this.selectedItem.checked_iniciado = false;
  const data: any = this.selectedItem;
  const ref = this.dialogService.open(PopupAsociarProduccionComponent, {
  data,
   header: 'Cambiar estado a una producción',
   width: '80%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopupAsociarProduccionComponent: any) => {
      this.loadlist();
  });
}



asociarInsumos(elemento: any) {
  console.log(elemento);
  
  const data = elemento;

  const ref = this.dialogService.open(AsociarInsumoComponent, {
  data,
   header: 'Asociar insumo a producción',
   width: '98%',
   height: '90%'
  });
  ref.onClose.subscribe((AsociarInsumoComponent:any) => {

  });
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

  if (estado === 'NEUTRAL') {
    return {'border-es-neutral'  : 'null' };
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

