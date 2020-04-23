import { Component, OnInit } from '@angular/core';
import { calendarioIdioma } from './../../../../config/config';
import { DynamicDialogRef, MessageService, DialogService } from 'primeng/api';
import { ArticuloService } from './../../../../services/articulo.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { PopupCalculdorPalletsComponent } from './../../../../shared/components/popups/popup-calculdor-pallets/popup-calculdor-pallets.component';

@Component({
  selector: 'app-pop-up-orden-produccion-detalle-editar',
  templateUrl: './pop-up-orden-produccion-detalle-editar.component.html',
  styleUrls: ['./pop-up-orden-produccion-detalle-editar.component.scss'],
  providers: [DialogService]
})
export class PopUpOrdenProduccionDetalleEditarComponent implements OnInit {

  fecha_produccion: Date;
  es: any;
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;
  userData: any;
  cantidad = 0;

  // tslint:disable-next-line: max-line-length
  constructor(private alertServiceService: AlertServiceService, public dialogService: DialogService, private messageService: MessageService, private articuloService: ArticuloService, public ref: DynamicDialogRef) {

    this.cols = [
      { field: 'nombre', header: 'Articulo',  width: '30%' },
      { field: 'descripcion', header: 'Descripción',  width: '35%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '25%' },
      { field: 'unidades', header: 'Unidades',  width: '8%' },
      { field: 'pallet_pisos', header: 'Pisos',  width: '8%' },
      { field: 'pallet_pack', header: 'Pack',  width: '8%' },
      { field: '', header: '',  width: '6%' },
      { field: 'cantidad', header: 'Cantidad',  width: '8%' },
      { field: '', header: '',  width: '6%' },

   ];
  }


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma  ;
    this.fecha_produccion = new Date();
    this.loadlist();
  }

  actualizarFecha(event) {
    console.log(event);
    this.fecha_produccion = event;
    console.log(new Date(this.fecha_produccion));
  }


  loadlist() {

    this.loading = true;
    try {
        this.articuloService.getArticulo()
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



calcular(_elemento: any) {

  const data: any = _elemento;
  const ref1 = this.dialogService.open(PopupCalculdorPalletsComponent, {
  data,
   header: 'Calcular cantidad',
   width: '98%',
   height: '90%'
  });

  ref1.onClose.subscribe((PopupCalculdorPalletsComponent: any) => {

        if (PopupCalculdorPalletsComponent) {
     //     console.log(PopupCalculdorPalletsComponent);
     //     console.log(PopupCalculdorPalletsComponent[0]['unidades']);
        const resultado =  this.elementos.findIndex(x => x.id === _elemento.id);
       this.elementos[resultado]['cantidad'] = PopupCalculdorPalletsComponent[0]['unidades'];
       
        }
  });

 }

detalle(){
  
}
  guardar(_elemento: any){
   
    if (_elemento.cantidad > 0) {
      _elemento.orden_produccion_id = 0;
      _elemento.cantidad_solicitada = _elemento.cantidad;
      _elemento.cantidad_usada = 0;
      _elemento.cantidad_existente = _elemento.cantidad;
      _elemento.fecha_produccion = this.fecha_produccion;
      _elemento.estado = 'ACTIVO';
      _elemento.usuario_modifica_id = this.userData['id'];
      console.log(_elemento);
       this.ref.close(_elemento);
    } else {
      this.alertServiceService.throwAlert('warning',  ' La cantidad a producir debe ser mayor a 0', '', '500');
    }

  }

}
