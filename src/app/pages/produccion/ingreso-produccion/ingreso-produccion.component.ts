import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';

import { ProduccionService } from './../../../services/produccion.service';
import { OrdenProduccion } from 'src/app/models/orden-pedido.model';

import { OverlayPanel } from 'primeng/overlaypanel';
import { Produccion } from 'src/app/models/produccion.model';
import { AsociarInsumoComponent } from '../popups/popup/asociar-insumo/asociar-insumo.component';
import { AsociarInsumoDetalleComponent } from './../popups/popup/asociar-insumo-detalle/asociar-insumo-detalle.component';
import { AsociarProduccionComponent } from './../popups/popup/asociar-produccion/asociar-produccion.component';
import { AsociarProduccionDetalleComponent } from './../popups/popup/asociar-produccion-detalle/asociar-produccion-detalle.component';
import { PopupCalculdorPalletsComponent } from '../../../shared/components/popups/popup-calculdor-pallets/popup-calculdor-pallets.component';

/* -------------------------------------------------------------------------- */
/*         AGREGAR UNA PRODUCCION REALIZADA A UNA ORDEN DE PRODUCCION         */
/* -------------------------------------------------------------------------- */


@Component({
  selector: 'app-ingreso-produccion',
  templateUrl: './ingreso-produccion.component.html',
  styleUrls: ['./ingreso-produccion.component.scss']
})
export class IngresoProduccionComponent implements OnInit {


  cols: any[];
  cols_produccion: any[];
  columns: any[];
  elementos: any[];
  elementos_produccion: any[];
  selectedElemento:any;
  selecteditems: any;
  loading;


  constructor(private alertServiceService: AlertServiceService, 
              private articuloService: ArticuloService,private produccionService: ProduccionService,
              public dialogService: DialogService, private messageService: MessageService) {

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
    
    this.verDetalle();
  }


  accion(event:any,overlaypanel: OverlayPanel,elementos:any){
    if(elementos){
      this.selectedElemento = elementos;
      console.log(elementos);
    }     
    overlaypanel.toggle(event);
    }

  
verDetalle(){
 
  console.log(this.selectedElemento);
  this.loading = true;
  try {
        this.produccionService.getOrdenProduccionDetalleByEstado('ACTIVO')
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



AsociarProduccion(){
  
  let data:any; 
 data =  this.selectedElemento;
  const ref = this.dialogService.open(AsociarProduccionComponent, {
  data,
   header: 'Asociar producción a orden de pedido', 
   width: '98%',
   height: '90%'
  });
  ref.onClose.subscribe((AsociarProduccionComponent:any) => {

  });
}



AsociarProduccionDetalle(){
  
  let data:any; 
 data = this.selectedElemento;
  const ref = this.dialogService.open(AsociarProduccionDetalleComponent, {
  data,
   header: 'Detalle producción a orden de pedido', 
   width: '98%',
   height: '90%'
  });
  ref.onClose.subscribe((AsociarProduccionDetalleComponent:any) => {

  });
}


}
