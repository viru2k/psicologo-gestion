import { Component, OnInit } from '@angular/core';
import { InsumoService } from 'src/app/services/insumo.service';
import { AlertServiceService } from '../../../../services/alert-service.service';
import { DialogService, MessageService, DynamicDialogRef } from 'primeng/api';
import { calendarioIdioma } from '../../../../config/config';
import { formatDate } from '@angular/common';
import { StockMovimiento } from '../../../../models/stock-movimiento.model';
import { Filter } from './../../../../shared/filter';
import { PopupInsumoListadoComponent } from '../../popup-insumo-listado/popup-insumo-listado.component';

@Component({
  selector: 'app-popup-insumo-alta',
  templateUrl: './popup-insumo-alta.component.html',
  styleUrls: ['./popup-insumo-alta.component.scss']
})
export class PopupInsumoAltaComponent implements OnInit {

  es: any;
  cols: any[]; 
  columns: any[];
  elementos: any[] = [];
  selecteditems: any;
  loading;
  cantidad = 0;
  comprobante: string = 'X-00000-00000000';
  lote = '';
  cantidad_calculada = 0;
  display;
  elemento: any;
  tipos: any[];
  elementoFinal: StockMovimiento[] = [];
  selectedTipo = 'unidad';
  fecha: Date;
  userData: any;

  _nombre: any[] = [];
  _grupo_nombre: any[] = [];
  // tslint:disable-next-line: max-line-length
  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService, 
    public ref: DynamicDialogRef, private filter: Filter) {

    this.cols = [
      { field: '', header: '',  width: '6%' },
      { field: 'nombre', header: 'Insumo',  width: '25%' },
      { field: 'descripcion', header: 'Descripción',  width: '30%' },            
      { field: 'comprobante', header: 'Comprobante',  width: '16%' },
      { field: 'lote', header: 'Lote',  width: '16%' },
      { field: 'a_ingresar', header: 'A ingresar',  width: '12%' },
      { field: '', header: '',  width: '6%' },
     
   ];

  }



  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma;
    this.fecha = new Date();
    console.log('cargando insumo');
 //   this.loadlist();
  }

  loadlist(element: any[]) {

    let t: StockMovimiento;
    let i = 0;
    element.forEach(ele => {
      
      if (Number(ele.cantidad) > 0 ) {
        ele.fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en') ;
        console.log(ele);
        t = new StockMovimiento('', ele.insumo_id, ele.comprobante, ele.lote, ele.cantidad,0, ele.cantidad, 0, 0,0, this.userData.id, ele.fecha, ele.fecha, 'ACTIVO', ele.descripcion, ele.nombre) ;
        console.log(t);
        this.elementos.push (t);
      }
    }
      );
}



accion(evt: any, event: any) {
  if (event) {
   // this.selectedElemento = event;
  }
  console.log(event);
  this.elemento = event;
  this.display = true;
}

eliminarSeleccionado(element: any) {
  console.log(element);
  console.log(this.elementos.indexOf(element));
  const index = this.elementos.indexOf(element);
  if (index > -1) {
    this.elementos.splice(index, 1);
    console.log(this.elementos);
  }
}

//cuando oprimo escape
escape() {
  this.cantidad_calculada = 0;
  this.cantidad = 0;
  this.selectedTipo = 'unidad';
}

recalcular() {
  console.log(this.selectedTipo);
  console.log(this.elemento);
  if (this.selectedTipo === 'empaque') {
    this.cantidad_calculada = this.cantidad * Number(this.elemento.cantidad_empaque);
    console.log(this.cantidad_calculada);
  } else {
    this.cantidad_calculada = this.cantidad * Number(this.elemento.cantidad_unitaria);
  }
}

confirmarCantidad() {
  this.elemento.comprobante = this.comprobante;
  this.elemento.a_ingresar = this.cantidad_calculada;
  this.elemento.lote = this.lote;
  this.display = false;
  this.cantidad = 0;
  this.cantidad_calculada = 0;
  this.selectedTipo = 'unidad';
}

agregarInsumo() {
  let data: any;
  const ref = this.dialogService.open(PopupInsumoListadoComponent, {
  data,
   header: 'Seleccionar insumo',
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((PopupInsumoListadoComponent: any) => {
    if(PopupInsumoListadoComponent){
      console.log(PopupInsumoListadoComponent);
      this.loadlist(PopupInsumoListadoComponent);
      this.ref.close();
    }
      
  });


}

guardar() {
  
  // ARMO EL ARREGLO DE LOS ELEMENTOS QUE TIENEN CANTIDAD
  let t:StockMovimiento;
  let i = 0;
  this.elementos.forEach(ele => {
    console.log(ele);
    if (Number(ele.cantidad) > 0 ) {
      ele.fecha = formatDate(new Date(this.fecha), 'yyyy-MM-dd', 'en') ;
      t = new StockMovimiento('', ele.insumo_id, ele.comprobante, ele.lote, ele.cantidad, 0, ele.cantidad, 0, 0, 0, this.userData.id, ele.fecha, ele.fecha, 'ACTIVO', ele.descipcion, ele.nombre) ;
      this.elementoFinal.push(t);
    }
  }
    );
  try {
    
      this.insumoService.setInsumoStock(this.elementoFinal)
      .subscribe(resp => {
        if (resp === 'ok') {
        //  this.elementos = resp;
        this.alertServiceService.throwAlert('success', 'Se guardaron los insumos seleccionados', '', '200');
            this.ref.close(PopupInsumoAltaComponent);
            } else {
            //  this.elementos = null;
            }
        this.loading = false;
        console.log(resp);
        this.ref.close(PopupInsumoAltaComponent);
      },
      error => { // error path
        console.log(error);
        this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
     });
} catch (error) {
  this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
} 

  console.log(this.elementoFinal);
}


setColorColumn(color: string) {
  
//  console.log('color: ' + color + '!important;');
  //return {color: #CCCA3F!important; : 'null' };
  document.documentElement.style.setProperty('--custom-primary-color', color);
// return document.documentElement.style.setProperty('--custom-grid-color', color);
  return {'change-grid-color'  : 'null' };
  
//  color: #9E9E9E!important;


  // return  'color: ' + color + '!important;';
}



 parseTrueHexa(str) {
  return str.match(/^ *[a-f0-9]+ *$/i) ? parseInt(str, 16) : NaN;
}


iconoColor(estado: number) {
  
  if (estado !== 0) {
    return {'icono-danger'  : 'null' };
  }
  /* if (estado === 'PAUSADO') {
    return {'icono-warning'  : 'null' };
  }
  if (estado === 'CANCELADO') {
    return {'icono-danger'  : 'null' };
  }
  if (estado === 'FINALIZADO') {
    return {'icono-secondary'  : 'null' };
  } */
}


realizarFiltroBusqueda(resp: any[]){
  // FILTRO LOS ELEMENTOS QUE SE VAN USAR PARA FILTRAR LA LISTA
  this._nombre = [];
  this._grupo_nombre = [];

  resp.forEach(element => {
    this._nombre.push(element['nombre']);
    this._grupo_nombre.push(element['grupo_nombre']);

  });
  
  // ELIMINO DUPLICADOS
  this._nombre = this.filter.filterArray(this._nombre);  
  this._grupo_nombre = this.filter.filterArray(this._grupo_nombre);  


}

}

