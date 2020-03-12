import { Component, OnInit } from '@angular/core';
import { OrdenPedido } from '../../../../../models/orden-pedido.model';
import { Produccion } from 'src/app/models/produccion.model';
import { calendarioIdioma } from './../../../../../config/config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { AlertServiceService } from './../../../../../services/alert-service.service';
import { formatDate} from '@angular/common';
import { ProduccionService } from './../../../../../services/produccion.service';

@Component({
  selector: 'app-asociar-produccion',
  templateUrl: './asociar-produccion.component.html',
  styleUrls: ['./asociar-produccion.component.scss']
})
export class AsociarProduccionComponent implements OnInit {

  es: any;
  fecha: Date;
  _fecha:string;
  orden_pedido:OrdenPedido;
  cantidad_botella:number = 1;
  cantidad_litros:number = 1;
  produccion: Produccion;
  loading;

  constructor( private produccionService: ProduccionService, private alertServiceService:AlertServiceService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    console.log(this.config.data);
    this.es = calendarioIdioma;
    this.fecha = new Date();
  }

  actualizarFecha(event){
    console.log(event);
    this.fecha = event;
    console.log(new Date(this.fecha));
  }


  guardarProduccion(){    
   // console.log(this.selecteditems[0]['articulo_id']);
    const userData = JSON.parse(localStorage.getItem('userData'));
    this._fecha = formatDate(this.fecha, 'yyyy-MM-dd HH:mm', 'en');
    this.produccion = new Produccion('0',this.config.data['orden_pedido_articulos_id'],this.config.data['articulo_id'],
    this._fecha,'1',this.cantidad_botella, this.cantidad_litros, '1',userData['id'],userData['id']);
    console.log(this.produccion);
    try {
      this.produccionService.setProduccionOrdenPedido(this.produccion)
      .subscribe(resp => {
       this.loading = false;
       console.log(resp);
       this.alertServiceService.throwAlert('success', 'Producción agregada a orden de pedido número '+this.config.data['id'], '', '200');
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
    this.ref.close();
}


}
