import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, DynamicDialogConfig } from 'primeng/api';
import { ProduccionService } from './../../../../services/produccion.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { calendarioIdioma } from './../../../../config/config';
import { OrdenProduccionDetalle } from './../../../../models/orden-produccion-detalle.model';


@Component({
  selector: 'app-popup-orden-produccion-detalle-consulta',
  templateUrl: './popup-orden-produccion-detalle-consulta.component.html',
  styleUrls: ['./popup-orden-produccion-detalle-consulta.component.scss']
})
export class PopupOrdenProduccionDetalleConsultaComponent implements OnInit {

  elementos: any[];
  userData: any;
  loading;

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService, public dialogService: DialogService, private messageService: MessageService, private config: DynamicDialogConfig) {
  }


  ngOnInit() {
    console.log(this.config.data);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loadlist(this.config.data['id']);
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

 
 agregarProduccion(elemento: any) {

 }

 buscar(elemento: any) {

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

}
