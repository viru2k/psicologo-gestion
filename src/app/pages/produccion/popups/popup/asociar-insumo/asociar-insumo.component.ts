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
  existencia =0;
  cantidad_ingresada = 0;

  cantidadProyectada = 0;
  cantidadEstimada = 0;
  cantidadAfectada = 0;
  selectedRow: any;

  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,
              public ref: DynamicDialogRef, public config: DynamicDialogConfig, public dialogService: DialogService, private messageService: MessageService) { 
    this.cols = [
          
      { field: 'nombre', header: 'Insumo',  width: '40%' },      
      { field: 'cantidad_unitaria', header: 'Cant. unitaria',  width: '12%' },      
      { field: 'cantidad', header: 'Formula',  width: '18%' },
      { field: 'cantidad_proyectada', header: 'Proyectado',  width: '18%' },
      { field: 'cantidad_estimada', header: 'Realizado',  width: '18%' },
      { field: 'cantidad_afectada', header: 'Usado',  width: '18%' },
      { field: '', header: '',  width: '6%' }
    ];
   }

  ngOnInit() {
    console.log(this.config.data);
    this.verDetalle();
  }


  accion(event: any, overlaypanel: OverlayPanel, elementos: any) {
    this.selectedRow = elementos;
    this.cantidadEstimada = elementos.cantidad_estimada;
    console.log(this.selectedRow);
    
    
    overlaypanel.toggle(event);
    }

    cerrarVentanta()  {
      this.cantidad_ingresada = 0;
      
      
    }

    agregarValor(event: any, overlaypanel: OverlayPanel) {
      
      this.selectedRow.cantidad_afectada = this.cantidad_ingresada;
      console.log(this.selectedRow.cantidad_afectada );
      this.cantidad_ingresada = 0;
      console.log(event);
      overlaypanel.hide();
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
            element.cantidad_proyectada = Number(element.cantidad) * Number(this.config.data.cantidad_solicitada);
            element.cantidad_estimada = Number(element.cantidad) * Number(this.config.data.cantidad_producida);
          
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
