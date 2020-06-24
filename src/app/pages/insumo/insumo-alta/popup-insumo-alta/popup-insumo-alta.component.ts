import { Component, OnInit } from '@angular/core';
import { InsumoService } from 'src/app/services/insumo.service';
import { AlertServiceService } from '../../../../services/alert-service.service';
import { DialogService, MessageService, DynamicDialogRef } from 'primeng/api';
import { calendarioIdioma } from '../../../../config/config';
import { formatDate } from '@angular/common';
import { StockMovimiento } from '../../../../models/stock-movimiento.model';

@Component({
  selector: 'app-popup-insumo-alta',
  templateUrl: './popup-insumo-alta.component.html',
  styleUrls: ['./popup-insumo-alta.component.scss']
})
export class PopupInsumoAltaComponent implements OnInit {

  es: any;
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;
  cantidad = 0;
  cantidad_calculada = 0;
  display;
  elemento: any;
  tipos: any[];
  elementoFinal: StockMovimiento[] = [];
  selectedTipo = 'unidad';
  fecha: Date;
  userData: any;
  // tslint:disable-next-line: max-line-length
  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService,
    public ref: DynamicDialogRef) {

    this.cols = [
      { field: 'nombre', header: 'Insumo',  width: '25%' },
      { field: 'descripcion', header: 'Descripción',  width: '30%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '16%' },
      { field: 'grupo_nombre', header: 'Grupo',  width: '16%' },
      { field: 'cantidad_unitaria', header: 'C. unitaria',  width: '16%' },
      { field: 'cantidad_empaque', header: 'C. Empaque',  width: '16%' },
      { field: 'a_ingresar', header: 'A ingresar',  width: '16%' },
      { field: '', header: '',  width: '10%' }
   ];

    this.tipos = [
    {label: 'Unidad', value: 'unidad'},
    {label: 'Empaque', value: 'empaque'}
];
  }



  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.es = calendarioIdioma;
    this.fecha = new Date();
    console.log('cargando insumo');
    this.loadlist();
  }

  loadlist() {

    this.loading = true;
    try {
        this.insumoService.getInsumo()
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



accion(evt: any, event: any) {
  if (event) {
   // this.selectedElemento = event;
  }
  console.log(event);
  this.elemento = event;
  this.display = true;
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

  this.elemento.a_ingresar = this.cantidad_calculada;
  this.display = false;
  this.cantidad = 0;
  this.cantidad_calculada = 0;
  this.selectedTipo = 'unidad';
}

guardar() {
  
  // ARMO EL ARREGLO DE LOS ELEMENTOS QUE TIENEN CANTIDAD
  let t:StockMovimiento;
  let i = 0;
  this.elementos.forEach(ele => {
  //  console.log(ele);
    if (Number(ele.a_ingresar) > 0 ) {
      ele.fecha = formatDate(new Date(this.fecha), 'yyyy-MM-dd', 'en') ;
      t = new StockMovimiento('', ele.id, ele.a_ingresar, 0, ele.a_ingresar, 0, 0, 0, this.userData.id, ele.fecha, ele.fecha, 'ACTIVO') ;
      this.elementoFinal.push (t);
    }
  }
    );
  try {
      this.insumoService.setInsumoStock(this.elementoFinal)
      .subscribe(resp => {
        if (resp === 'ok') {
        //  this.elementos = resp;
            this.ref.close(this.elementoFinal);
            } else {
            //  this.elementos = null;
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

}

