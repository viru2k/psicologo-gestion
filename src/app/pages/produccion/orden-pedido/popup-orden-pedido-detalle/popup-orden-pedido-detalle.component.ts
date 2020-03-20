import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, SelectItem } from 'primeng/api';
import { ProduccionService } from './../../../../services/produccion.service';
import { AlertServiceService } from './../../../../services/alert-service.service';

@Component({
  selector: 'app-popup-orden-pedido-detalle',
  templateUrl: './popup-orden-pedido-detalle.component.html',
  styleUrls: ['./popup-orden-pedido-detalle.component.scss']
})
export class PopupOrdenPedidoDetalleComponent implements OnInit {

  cols:any;
  selectedElemento: any;
  elementos_produccion:any[] = [];
  selecteditems:any;
  loading;
  constructor(private config: DynamicDialogConfig, private produccionService: ProduccionService, private alertServiceService:AlertServiceService) { 

    this.cols = [

      { field: 'fecha_pedido', header: 'Fecha creación',  width: '30%' },
      { field: 'descripcion', header: 'Estado',  width: '50%' },
      { field: 'cantidad', header: 'Cantidad',  width: '20%' }      

   ];
  }


  ngOnInit() {
    this.selectedElemento = this.config.data;
    this.verDetalle();
  }





verDetalle(){
 
  console.log(this.selectedElemento);
  this.loading = true;
  try {
        this.produccionService.getOrdenProduccionDetalleById(this.selectedElemento['id'])
        .subscribe(resp => {
         
         this.elementos_produccion = resp;
         this.loading = false;
         console.log(resp);
        },
        error => { // error path
            console.log(error);
  
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.loading = false;
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
  }
  
}