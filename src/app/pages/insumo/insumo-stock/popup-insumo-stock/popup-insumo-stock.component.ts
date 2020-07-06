import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../../../../services/insumo.service';
import { AlertServiceService } from '../../../../services/alert-service.service';
import { DialogService } from 'primeng/components/common/api';
import { MessageService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { PopupInsumoStockDetalleProduccionComponent } from '../popup-insumo-stock-detalle-produccion/popup-insumo-stock-detalle-produccion.component';

@Component({
  selector: 'app-popup-insumo-stock',
  templateUrl: './popup-insumo-stock.component.html',
  styleUrls: ['./popup-insumo-stock.component.scss']
})
export class PopUpInsumoStockComponent implements OnInit {
  cols: any;
  userdata: any;
  loading;
  elementos: any[];

  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, public dialogService: DialogService, private messageService: MessageService) { 
      this.cols = [
        { field: 'nombre', header: 'Insumo',  width: '30%' },
        { field: 'comprobante', header: 'Comp. nº',  width: '18%' },
        { field: 'lote', header: 'Lote',  width: '16%' },
        { field: 'fecha_ingreso', header: 'Ingresado',  width: '18%' },
        { field: 'fecha_movimiento', header: 'Ultimo consumo',  width: '18%' },
        { field: 'cantidad', header: 'Cant. ingresada',  width: '12%' },
        { field: 'cantidad_usada', header: 'Usado',  width: '12%' },
        { field: 'cantidad_existente', header: 'Existencia',  width: '12%' },
      { field: '', header: '',  width: '6%' }
     ];
}

  ngOnInit() {
    
    console.log(this.config.data);
    this.loadlist();
  }


  
  loadlist() {

    this.loading = true;
    try {
        this.insumoService.getStockMovimientoByInsumoAndEstado( 'ACTIVO', this.config.data.insumo_id)
        .subscribe(resp => {
          if (resp[0]) {
            this.elementos = resp;
            console.log(this.elementos);
            this.elementos.forEach(ele => {
              ele.a_ingresar = 0;
            });

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


detalle(elemento: any) {

  const data: any = elemento;
  const ref = this.dialogService.open(PopupInsumoStockDetalleProduccionComponent, {
  data,
   header: 'Detalle del insumo en produccion',
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((PopupInsumoStockDetalleProduccionComponent: any) => {
        this.loadlist();
  });

}
}
