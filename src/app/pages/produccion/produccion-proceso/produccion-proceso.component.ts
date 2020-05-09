import { Component, OnInit } from '@angular/core';
import { OrdenProduccion } from './../../../models/orden-produccion.model';
import { OrdenProduccionDetalle } from './../../../models/orden-produccion-detalle.model';
import { AlertServiceService } from './../../../services/alert-service.service';
import { MessageService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from './../../../services/produccion.service';
import { calendarioIdioma } from './../../../config/config';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-produccion-proceso',
  templateUrl: './produccion-proceso.component.html',
  styleUrls: ['./produccion-proceso.component.scss']
})
export class ProduccionProcesoComponent implements OnInit {

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

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService) {

    this.cols = [                  
      { field: 'orden_produccion_detalle_id', header: 'Prod Nª',  width: '7.5%' },
      { field: 'estado', header: 'Estado',  width: '12%' },
      { field: 'fecha_produccion', header: 'A producir en',  width: '18%' },
      { field: 'nombre', header: 'Producto',  width: '30%' },
      { field: 'maquina_nombre', header: 'Máquina',  width: '20%' },
      { field: 'hora_inicio', header: 'Inicio',  width: '12%' },
      { field: 'hora_fin', header: 'Fin',  width: '12%' },
      { field: 'cantidad_solicitada', header: 'Solicitado',  width: '10%' },
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
  }

   loadlist() {
    
    this.loading = true;
    try {
         this.produccionService.getProduccionProcesoByEstado()
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

