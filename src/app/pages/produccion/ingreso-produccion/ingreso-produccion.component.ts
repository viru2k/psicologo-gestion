import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';
import { calendarioIdioma } from './../../../config/config';
import { ProduccionService } from './../../../services/produccion.service';
import { OrdenPedido } from 'src/app/models/orden-pedido.model';
import { formatDate} from '@angular/common';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Produccion } from 'src/app/models/produccion.model';

@Component({
  selector: 'app-ingreso-produccion',
  templateUrl: './ingreso-produccion.component.html',
  styleUrls: ['./ingreso-produccion.component.scss']
})
export class IngresoProduccionComponent implements OnInit {

  es: any;
  cols: any[];
  cols_produccion: any[];
  columns: any[];
  elementos: any[];
  elementos_produccion: any[];
  selectedElemento:any;
  selecteditems: any;
  loading;
  fecha: Date;
  _fecha:string;
  orden_pedido:OrdenPedido;
  cantidad_botella:number = 1;
  cantidad_litros:number = 1;
  produccion: Produccion;

  constructor(private alertServiceService: AlertServiceService, 
              private articuloService: ArticuloService,private produccionService: ProduccionService,
              public dialogService: DialogService, private messageService: MessageService) {

                this.cols = [
                  { field: 'id', header: 'Nª',  width: '6%' },
                  { field: 'fecha_pedido', header: 'Fecha pedido',  width: '10%' },
                  { field: 'descripcion', header: 'Descripcion',  width: '40%' },
                  { field: 'cantidad', header: 'Cantidad solicitada',  width: '10%' },
                  { field: 'nombreyapellido', header: 'Usuario',  width: '40%' }
                ];
               }

  ngOnInit() {
    this.es = calendarioIdioma;
    this.fecha = new Date();
    this.verDetalle();
  }

  actualizarFecha(event){
    console.log(event);
    this.fecha = event;
    console.log(new Date(this.fecha));
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
        this.produccionService.getOrdenPedidoDetalleByEstado('ACTIVO')
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

  guardarProduccion(){
    console.log(this.selecteditems);
   // console.log(this.selecteditems[0]['articulo_id']);
    let userData = JSON.parse(localStorage.getItem('userData'));
    this._fecha = formatDate(this.fecha, 'yyyy-MM-dd HH:mm', 'en');
    this.produccion = new Produccion('0',this.selecteditems['id'],this.selecteditems['articulo_id'],
    this._fecha,'1',this.cantidad_botella, this.cantidad_litros, '1',userData['id'],userData['id']);
    console.log(this.produccion);
    try {
      this.produccionService.setProduccionOrdenPedido(this.produccion)
      .subscribe(resp => {
       this.loading = false;
       console.log(resp);
       this.alertServiceService.throwAlert('success', 'Producción agregada a orden de pedido número '+this.selecteditems['id'], '', '200');
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
