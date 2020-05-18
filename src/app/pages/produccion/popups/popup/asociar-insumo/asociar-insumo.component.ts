import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from './../../../../../services/alert-service.service';
import { ProduccionService } from './../../../../../services/produccion.service';
import { DynamicDialogRef, DynamicDialogConfig, MessageService, DialogService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AsociarInsumoAltaComponent } from '../../../asociar-insumo/asociar-insumo-alta/asociar-insumo-alta.component';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-asociar-insumo',
  templateUrl: './asociar-insumo.component.html',
  styleUrls: ['./asociar-insumo.component.scss']
})
export class AsociarInsumoComponent implements OnInit {

  

  cols: any[];
  cols_produccion: any[];
  columns: any[];
  elementos: any[];
  elementos_produccion: any[];
  selectedElemento:any;
  selecteditems: any;
  loading;
  cantidad:number =0;
  cantidad_botella:number =0;
  cantidad_litros:number=0;
  cantidad_original:number=0;
  cantidad_salida:number=0;
  existencia:number=0;

  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,
              public ref: DynamicDialogRef, public config: DynamicDialogConfig, public dialogService: DialogService, private messageService: MessageService) { 
    this.cols = [
      { field: '', header: '',  width: '6%' },
      { field: 'id', header: 'Nª',  width: '4%' },
      { field: 'fecha_pedido', header: 'Fecha',  width: '10%' },
      { field: 'descripcion', header: 'Descripción',  width: '30%' },
      { field: 'cantidad', header: 'Producción',  width: '10%' },
      { field: 'fecha_produccion', header: 'Producido',  width: '10%' },
      { field: 'cantidad_botella', header: 'Botellas',  width: '10%' },
      { field: 'cantidad_litros', header: 'Litros',  width: '10%' },
      { field: 'fecha_ingreso', header: 'Ingreso',  width: '10%' },
      { field: 'fecha_egreso', header: 'Egreso',  width: '10%' },
      { field: 'cantidad_original', header: 'Original',  width: '10%' },
      { field: 'cantidad_salida', header: 'Salida',  width: '10%' },
      { field: 'existencia', header: 'Existencia',  width: '10%' },
      { field: 'nombreyapellido', header: 'Usuario',  width: '15%' }
    ];
   }

  ngOnInit() {
    console.log(this.config.data);
    this.verDetalle();
  }


  accion(event:any,overlaypanel: OverlayPanel,elementos:any){
    if(elementos){
      this.selectedElemento = elementos;
      console.log(elementos);
    }     
    overlaypanel.toggle(event);
    }

  

    asociarInsumo(){
      console.log('asociar');
      let data:any; 
     data =  this.selectedElemento;
      const ref = this.dialogService.open(AsociarInsumoAltaComponent, {
      data,
       header: 'Carga de insumo a producción',
       width: '98%',
       height: '90%'
      });
      ref.onClose.subscribe((AsociarInsumoAltaComponent:any) => {
    
      });
    }

verDetalle(){
 
  console.log(this.selectedElemento);
  this.loading = true;
  try {
        this.insumoService.getInsumoByArticulo(this.config.data.articulo_id)
        .subscribe(resp => {
          console.log(resp);
          let i = 0;
          this.elementos = resp;
          console.log(this.elementos);
          resp.forEach(element => {
      /*     this.cantidad = this.elementos[i]['cantidad'];
          this.cantidad_botella = Number(this.cantidad_botella)+ Number(this.elementos[i]['cantidad_botella']);
          this.cantidad_litros =  Number(this.cantidad_litros)+ Number(this.elementos[i]['cantidad_litros']);
          this.cantidad_original = this.elementos[i]['cantidad_original'];
          this.cantidad_salida =Number(this.cantidad_salida)+ Number(this.elementos[i]['cantidad_salida']);
          this.existencia = Number(this.existencia)+ Number(this.elementos[i]['existencia']); */
          i++;
        });
          this.loading = false;
         
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


  verDetalleTodos(){
 
    console.log(this.selectedElemento);
    this.loading = true;
    try {
          this.insumoService.getInsumoByArticulo(this.config.data['id'])
          .subscribe(resp => {
            console.log(resp);
            let i = 0;
            this.elementos = resp;
            console.log(this.elementos);
            resp.forEach(element => {
            this.cantidad = this.elementos[i]['cantidad'];
            this.cantidad_botella = Number(this.cantidad_botella)+ Number(this.elementos[i]['cantidad_botella']);
            this.cantidad_litros =  Number(this.cantidad_litros)+ Number(this.elementos[i]['cantidad_litros']);
            this.cantidad_original = this.elementos[i]['cantidad_original'];
            this.cantidad_salida =Number(this.cantidad_salida)+ Number(this.elementos[i]['cantidad_salida']);
            this.existencia = Number(this.existencia)+ Number(this.elementos[i]['existencia']);
            
            i++;
          }); 
            this.loading = false;
           
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

    

    moverAdeposito(){}

}
