import { Component, OnInit } from '@angular/core';
import { calendarioIdioma } from './../../../../config/config';
import { DynamicDialogRef, MessageService, DialogService, DynamicDialogConfig } from 'primeng/api';
import { ArticuloService } from './../../../../services/articulo.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { PopupCalculdorPalletsComponent } from './../../../../shared/components/popups/popup-calculdor-pallets/popup-calculdor-pallets.component';
import { SectorService } from '../../../../services/sector.service';

@Component({
  selector: 'app-pop-up-orden-produccion-detalle-editar',
  templateUrl: './pop-up-orden-produccion-detalle-editar.component.html',
  styleUrls: ['./pop-up-orden-produccion-detalle-editar.component.scss'],
  providers: [DialogService]
})
export class PopUpOrdenProduccionDetalleEditarComponent implements OnInit {

  selectedRow:any;
  fecha_produccion: Date;
  hora_produccion: Date;
  es: any;
  cols: any[];
  columns: any[];
  elementos: any[];
  grupos: any[];
  selecteditems: any;
  loading;
  userData: any;
  cantidad = 0;
  selected: any;
  display;
  position: string;  
  volumen: number;

  // tslint:disable-next-line: max-line-length
  constructor(private alertServiceService: AlertServiceService, public dialogService: DialogService, private messageService: MessageService, private articuloService: ArticuloService, public sectorService: SectorService, public ref: DynamicDialogRef,  private config: DynamicDialogConfig) {
    this.cols = [
      { field: 'fecha_produccion', header: 'Fecha producción',  width: '30%' },
      { field: 'horas', header: 'Horas',  width: '10%' },
      { field: 'grupo', header: 'Grupo',  width: '10%' },
      { field: 'nombre', header: 'Articulo',  width: '30%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '25%' },
      { field: 'unidades', header: 'Unidades',  width: '8%' },
      { field: 'pallet_pisos', header: 'Pisos',  width: '8%' },
      { field: 'pallet_pack', header: 'Pack',  width: '8%' },
      { field: '', header: '',  width: '6%' },
      { field: 'cantidad', header: 'Cantidad',  width: '8%' },
      { field: 'packs', header: 'Packs',  width: '8%' },
      { field: '', header: '',  width: '6%' },

   ];
  }


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma  ;
    this.fecha_produccion = new Date();
    this.hora_produccion = new Date(this.fecha_produccion.getFullYear(), this.fecha_produccion.getMonth(), this.fecha_produccion.getDate(), 8, 0, 0);
    this.loadlist();
    this.loadGrupo();
  }

  actualizarFecha(event) {
    console.log(event);
    this.fecha_produccion = event;
    console.log(new Date(this.fecha_produccion));
  }

  onChangeGrupo() {
    //console.log(e.target.value);
    console.log(this.selected);
  }


  showDialog(position: string) {
  
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



  loadGrupo() {

    this.loading = true;
    try {
        this.sectorService.getGrupo()
        .subscribe(resp => {
          if (resp[0]) {
            this.grupos = resp;
            console.log(this.grupos);
            this.selected = this.grupos ['0'];
              } else {
                this.grupos = null;
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



calcular() {

  const data: any = this.selectedRow;
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
        const resultado =  this.elementos.findIndex(x => x.id === this.selectedRow.id);
        this.elementos[resultado]['cantidad'] = PopupCalculdorPalletsComponent[0]['unidades'];
        this.cantidad =   PopupCalculdorPalletsComponent[0]['unidades'];
        this.volumen = PopupCalculdorPalletsComponent[1]['volumen'];

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

  editarProduccion( _elemento: any) {
    this.selectedRow = _elemento;
    console.log(this.selectedRow);
    this.position = 'top';
    this.display = true;
  }

}
