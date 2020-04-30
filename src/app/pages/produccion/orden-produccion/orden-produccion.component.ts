import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';
import { PopOrdenProduccionEditarComponent } from './pop-orden-produccion-editar/pop-orden-produccion-editar.component';
import { ProduccionService } from '../../../services/produccion.service';
import { calendarioIdioma } from './../../../config/config';


@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.scss']
})
export class OrdenProduccionComponent implements OnInit {

  fechaHoy: Date;
  _fechaHoy: string;
  fecha: Date;
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;
  userData: any;
  es: any;
  checked;
  // tslint:disable-next-line: max-line-length
  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService, public dialogService: DialogService, private messageService: MessageService) {

    this.cols = [
      { field: 'id', header: 'Nº',  width: '6%' },
      { field: 'fecha_creacion', header: 'Creado',  width: '15%' },
      { field: 'descripcion', header: 'Descripción',  width: '30%' },
      { field: 'observacion', header: 'Observación',  width: '25%' },
      { field: 'estado', header: 'Estado',  width: '10%' },
      { field: 'fecha_desde', header: 'Desde',  width: '12%' },
      { field: 'fecha_hasta', header: 'Hasta',  width: '12%' },
      { field: 'nombreyapellido', header: 'Usuario',  width: '20%' },
      { field: '', header: '',  width: '6%' },

   ];
  }

  ngOnInit() {
   this.userData = JSON.parse(localStorage.getItem('userData'));
   // this.alertServiceService.throwAlert('success','Articulo guardado','','201');
   this.es = calendarioIdioma;
   this.fechaHoy = new Date();
   this.fecha = new Date();
   this.loadlist();
  }

  handleChange(e) {
    this.checked = e.checked;
    console.log(this.checked);
    if (this.checked) {
      this.loadlistTodos();
    } else {
      this.loadlist();
    }
}

  loadlist() {

    this.loading = true;
    try {
        this.produccionService.getOrdenProduccionEstado('ACTIVO')
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



loadlistTodos() {

  this.loading = true;
  try {
      this.produccionService.getOrdenProduccionEstado('FINALIZADO')
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

buscar(elemento: any) {
  console.log(elemento);
  let data: any;
  data = elemento;
  const ref = this.dialogService.open(PopOrdenProduccionEditarComponent, {
  data,
   header: 'Orden producción',
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe(() => {
        this.loadlist();
  });

}


nuevo() {
  const data: any = null;
  const ref = this.dialogService.open(PopOrdenProduccionEditarComponent, {
  data,
   header: 'Orden producción',
   width: '98%',
   height: '90%'
  });
  ref.onClose.subscribe(() => {
        this.loadlist();
  });
}



colorRow(estado: string) {

  if (estado === 'ACTIVO') {
    return {'es-activo'  : 'null' };
  }
  if (estado === 'PAUSADO') {
    return {'es-pausado'  : 'null' };
  }
  if (estado === 'CANCELADO') {
    return {'es-cancelado'  : 'null' };
  }
  if (estado === 'FINALIZADO') {
    return {'es-finalizado'  : 'null' };
  }
}
}

