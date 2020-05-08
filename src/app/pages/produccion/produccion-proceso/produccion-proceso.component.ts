import { Component, OnInit } from '@angular/core';
import { OrdenProduccion } from './../../../models/orden-produccion.model';
import { OrdenProduccionDetalle } from './../../../models/orden-produccion-detalle.model';
import { AlertServiceService } from './../../../services/alert-service.service';
import { MessageService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from './../../../services/produccion.service';
import { calendarioIdioma } from './../../../config/config';

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

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService) {
    this.cols = [
      { field: 'fecha_produccion', header: 'Generado',  width: '15%' },
      { field: 'nombre', header: 'Producto',  width: '25%' },
      { field: 'descripcion', header: 'Descripción',  width: '30%' },
      { field: 'pallet_pack', header: 'Pack',  width: '8%' },
      { field: 'pallet_pisos', header: 'Pisos',  width: '8%' },
      { field: 'unidades', header: 'Unidades',  width: '10%' },
      { field: 'cantidad_solicitada', header: 'A producir',  width: '12%' },
      { field: 'cantidad_usada', header: 'Producido',  width: '12%' },
      { field: 'cantidad_existente', header: 'Restante',  width: '12%' },
      { field: 'estado', header: 'Estado',  width: '15%' },
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
    return {'es-activo'  : 'null' };
  }
  if (estado === 'PAUSADO') {
    return {'es-pausado'  : 'null' };
  }
  if (estado === 'CANCELADO') {
    return {'es-cancelado'  : 'null' };
  }
  if (estado === 'FINALIZADO') {
    return {'es-finalizado'  : 'null' };
  }
}
}

