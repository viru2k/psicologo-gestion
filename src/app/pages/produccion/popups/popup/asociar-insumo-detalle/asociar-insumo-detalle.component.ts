import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from './../../../../../services/alert-service.service';
import { ProduccionService } from './../../../../../services/produccion.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-asociar-insumo-detalle',
  templateUrl: './asociar-insumo-detalle.component.html',
  styleUrls: ['./asociar-insumo-detalle.component.scss']
})
export class AsociarInsumoDetalleComponent implements OnInit {


  cols: any[];
  cols_produccion: any[];
  columns: any[];
  elementos: any[];
  elementos_produccion: any[];
  selectedElemento:any;
  selecteditems: any;
  loading;
  constructor(private produccionService: ProduccionService, private alertServiceService: AlertServiceService,
     public ref: DynamicDialogRef, public config: DynamicDialogConfig) { 
    this.cols = [
      { field: 'accion', header: 'Accion' , width: '6%'} ,
      { field: 'id', header: 'Nª',  width: '6%' },
      { field: 'fecha_pedido', header: 'Fecha pedido',  width: '10%' },
      { field: 'descripcion', header: 'Descripcion',  width: '40%' },
      { field: 'cantidad', header: 'Cantidad solicitada',  width: '10%' },
      { field: 'nombreyapellido', header: 'Usuario',  width: '40%' }
    ];
   }

  ngOnInit() {
    console.log(this.config.data);
    this.verDetalle();
  }

  
verDetalle(){
 
  console.log(this.selectedElemento);
  this.loading = true;
  try {
        this.produccionService.getProduccionByOrdenPedido(this.config.data['id'])
        .subscribe(resp => {
         
         this.elementos = resp;
         this.loading = false;
         console.log(resp);
        },
        error => { // error path
            console.log(error);
            this.loading = false;
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.loading = false;
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
  }



}
