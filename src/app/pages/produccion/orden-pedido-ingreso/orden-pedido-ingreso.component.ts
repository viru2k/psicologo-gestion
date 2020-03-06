import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';
import { calendarioIdioma } from './../../../config/config';
import { ProduccionService } from './../../../services/produccion.service';
import { OrdenPedido } from 'src/app/models/orden-pedido.model';
import { formatDate} from '@angular/common';

@Component({
  selector: 'app-orden-pedido-ingreso',
  templateUrl: './orden-pedido-ingreso.component.html',
  styleUrls: ['./orden-pedido-ingreso.component.scss']
})
export class OrdenPedidoIngresoComponent implements OnInit {

  es: any;
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;
  fecha: Date;
  orden_pedido:OrdenPedido;
  // tslint:disable-next-line: variable-name
  _fecha: string;

  constructor(private alertServiceService: AlertServiceService, 
              private articuloService: ArticuloService,private produccionService: ProduccionService,
              public dialogService: DialogService, private messageService: MessageService) {
    this.cols = [

      { field: 'descripcion', header: 'Articulo',  width: '50%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '30%' },
      { field: 'cantidad', header: 'Cantidad',  width: '20%' },

   ];
  }

  ngOnInit() {
    this.es = calendarioIdioma;
    this.fecha = new Date();
   // this.alertServiceService.throwAlert('success','Articulo guardado','','201');
    this.loadlist();
  }

  loadlist(){

    this.loading = true;
    try {
        this.articuloService.getArticulo()
        .subscribe(resp => {
          if (resp[0]) {
            let i = 0;
            this.elementos = resp;
            resp.forEach(element => {
              this.elementos[i] = resp[i];
              this.elementos[i]['cantidad'] = 0;
              i++;
            });
            this.elementos = resp;
            console.log(this.elementos);
              }else{
                this.elementos = null;
              }
          this.loading = false;
          console.log(resp);
        },
        error => { // error path
            console.log(error);
            this.loading = false;
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}

actualizarFecha(event){
  console.log(event);
  this.fecha = event;
  console.log(new Date(this.fecha));
}

nuevo(){

  if(this.selecteditems === undefined){
    this.alertServiceService.throwAlert('warning','Debe seleccionar al menos un producto','Problema en los datos', '500');
    console.log(this.selecteditems);
  }else{
    try {
     
      let userData = JSON.parse(localStorage.getItem('userData'));
      this._fecha = formatDate(this.fecha, 'yyyy-MM-dd HH:mm', 'en');
      this.orden_pedido = new OrdenPedido('',this._fecha,userData['id'], this.selecteditems);
      console.log(this.orden_pedido);
      this.produccionService.setOrdenPedido(this.orden_pedido)
      .subscribe(resp => {
        console.log(resp);    
        this.loadlist();
        this.loading = false;
        this.alertServiceService.throwAlert('success','Orden de pedido creada','Datos guardados','200');
        this.limpiarDatos();
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          this.loading = false;
       });  
  } catch (error) {
    this.alertServiceService.throwAlert('error','error','Error: '+error+'  Error al cargar los registros','500');
  }  
  }
}

limpiarDatos(){
  this.selecteditems = [];
  this.orden_pedido = null;
  
}
}

