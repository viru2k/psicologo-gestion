import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from './../../../../services/produccion.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { calendarioIdioma } from './../../../../config/config';
import { PopUpOrdenProduccionDetalleEditarComponent } from './../pop-up-orden-produccion-detalle-editar/pop-up-orden-produccion-detalle-editar.component';
import { OrdenProduccionDetalle } from './../../../../models/orden-produccion-detalle.model';
import { OrdenProduccion } from './../../../../models/orden-produccion.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-pop-orden-produccion-editar',
  templateUrl: './pop-orden-produccion-editar.component.html',
  styleUrls: ['./pop-orden-produccion-editar.component.scss'],
  providers: [DialogService]
})
export class PopOrdenProduccionEditarComponent implements OnInit {
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

   // tslint:disable-next-line: max-line-length
   constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService, public dialogService: DialogService, private messageService: MessageService, private config: DynamicDialogConfig) {

    this.cols = [
      { field: 'fecha_produccion', header: 'Producir',  width: '15%' },
      { field: 'nombre', header: 'Producto',  width: '25%' },
      { field: 'descripcion', header: 'Descripción',  width: '30%' },
      { field: 'pallet_pack', header: 'Pack',  width: '10%' },
      { field: 'pallet_pisos', header: 'Pisos',  width: '10%' },
      { field: 'unidades', header: 'Unidades',  width: '10%' },
      { field: 'cantidad', header: 'Cantidad',  width: '12%' },
      { field: 'estado', header: 'Estado',  width: '15%' },
      { field: '', header: '',  width: '6%' },

   ];
   }


  ngOnInit() {
    this.es = calendarioIdioma  ;
    this.fecha_creacion = new Date();
    this.fecha_desde = new Date();
    this.fecha_hasta = new Date();
    this.fecha = new Date();
    console.log(this.config.data);
    if (this.config.data) {
      this.editar = true;
      this.obesrvacion = this.config.data.observacion;
      this.descripcion = this.config.data.descripcion;
      this.fecha_creacion = new Date(this.config.data.fecha_creacion);
      this.fecha_desde =  new Date(this.config.data.fecha_desde);
      this.fecha_hasta =  new Date(this.config.data.fecha_hasta);
   
      this.loadlist(this.config.data['id']);
    }

    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
    // this.alertServiceService.throwAlert('success','Articulo guardado','','201');
  //  this.loadlist();
   }


  actualizarFecha(event) {
    console.log(event);
    this.fecha_creacion = event;
    console.log(new Date(this.fecha_creacion));
    
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
 
 buscarArticulo(){
  
  const data: any = null;
  
  const ref = this.dialogService.open(PopUpOrdenProduccionDetalleEditarComponent, {
  data,
   header: 'Asociar articulo',
   width: '98%',
   height: '90%'
  });

  // tslint:disable-next-line: no-shadowed-variable
  ref.onClose.subscribe((PopUpOrdenProduccionDetalleEditarComponent: any) => {
    if (PopUpOrdenProduccionDetalleEditarComponent) {
      console.log(PopUpOrdenProduccionDetalleEditarComponent);
      this.elementos.push(PopUpOrdenProduccionDetalleEditarComponent);
    }
    
  });

 }

 detalle(element:any) {

 }


 nuevo() {
  this._fecha_creacion = formatDate(new Date(this.fecha_creacion), 'yyyy-MM-dd', 'en');
  this._fecha_desde = formatDate(new Date(this.fecha_desde), 'yyyy-MM-dd', 'en');
  this._fecha_hasta = formatDate(new Date(this.fecha_hasta), 'yyyy-MM-dd', 'en');
  if (this.elementos.length > 0) {
    if ((this.obesrvacion !== '') && (this.descripcion !== '')) {
      // tslint:disable-next-line: max-line-length
      this.ordenProduccion = new OrdenProduccion('0', this._fecha_creacion, this.userData['id'], this.descripcion, this.obesrvacion, this.elementos, this._fecha_desde, this._fecha_hasta);
      console.log(this.ordenProduccion);
      this.guardar(this.ordenProduccion);
    } else {
      this.alertServiceService.throwAlert('warning', 'El campo descripción  y observación debe estar completo', '', '500');
    }
  } else {
    this.alertServiceService.throwAlert('warning', 'La producción debe tener al menos un producto', '', '500');
  }
 }

 guardar(ordenProduccion: OrdenProduccion) {
  try {
    this.produccionService.setProduccionOrdenProduccion(ordenProduccion)
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
 
 
