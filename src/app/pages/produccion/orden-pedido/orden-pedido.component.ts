import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';
import { calendarioIdioma } from './../../../config/config';
import { ProduccionService } from './../../../services/produccion.service';
import { OrdenPedido } from 'src/app/models/orden-pedido.model';
import { formatDate} from '@angular/common';
import { OverlayPanel } from 'primeng/overlaypanel';
import { PopupOrdenPedidoDetalleComponent } from './popup-orden-pedido-detalle/popup-orden-pedido-detalle.component';

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.scss']
})
export class OrdenPedidoComponent implements OnInit {

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
  orden_pedido:OrdenPedido;
  // tslint:disable-next-line: variable-name
  _fecha: string;
  pedido:any[];
  // tslint:disable-next-line: variable-name
  selected_pedido = 'ACTIVO';

  constructor(private alertServiceService: AlertServiceService, 
              private articuloService: ArticuloService,private produccionService: ProduccionService,
              public dialogService: DialogService, private messageService: MessageService) {

                this.cols = [
                  { field: 'accion', header: 'Accion' , width: '6%'} ,
                  { field: 'id', header: 'Producción' , width: '10%'} ,
                  { field: 'sector_nombre', header: 'Sector' , width: '25%'} ,
                  { field: 'fecha_pedido', header: 'Fecha creación',  width: '10%' },
                  { field: 'estado', header: 'Estado',  width: '20%' },
                  { field: 'nombreyapellido', header: 'Generó',  width: '30%' }
                ];
   



    this.pedido = [
    {label: 'ACTIVO',value: 'ACTIVO'},
    {label: 'FINALIZADO',value: 'FINALIZADO'},
    {label: 'PAUSADO',value: 'PAUSADO'},

    
];
  }

  ngOnInit() {
    this.es = calendarioIdioma;
    this.fecha = new Date();
   // this.alertServiceService.throwAlert('success','Articulo guardado','','201');
    this.loadlist();
    
  }


  
  accion(event:any,overlaypanel: OverlayPanel,elementos:any){
    if(elementos){
      this.selectedElemento = elementos;
      console.log(elementos);
    }     
    overlaypanel.toggle(event);
    }


  loadlist(){

    this.loading = true;
    try {
        this.produccionService.getOrdenPedidoEstado('ACTIVO')
        .subscribe(resp => {
          if (resp[0]) {
            let i = 0;
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
    
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.loading = false;
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}


loadlistByEstado(){
  console.log(this.selected_pedido['label']);
  this.loading = true;
  try {
      this.produccionService.getOrdenPedidoEstado(this.selected_pedido['label'])
      .subscribe(resp => {
        if (resp[0]) {
          let i = 0;
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
  
          this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
       });
  } catch (error) {
    this.loading = false;
    this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
  }
}

actualizarFecha(event){
  console.log(event);
  this.fecha = event;
  console.log(new Date(this.fecha));
}



verDetalle(){
  let data:any; 
  data =  this.selectedElemento;
   const ref = this.dialogService.open(PopupOrdenPedidoDetalleComponent, {
   data,
    header: 'Detalle de insumos en producción', 
    width: '98%',
    height: '90%'
   });
   ref.onClose.subscribe((PopupOrdenPedidoDetalleComponent:any) => {
 
   });
}

modificarEstado(estado:string){
  
    console.log(this.selectedElemento);
    this.loading = true;
    try {
      this.produccionService.updateOrdenPedido(this.selectedElemento['id'],estado)
      .subscribe(resp => {
       
        this.loadlist();
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

