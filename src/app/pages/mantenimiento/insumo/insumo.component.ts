import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../../../services/insumo.service';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { InsumoEditarComponent } from './../insumo-editar/insumo-editar.component';


@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.scss'],
  providers: [MessageService, DialogService]
})
export class InsumoComponent implements OnInit {

  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;

  // tslint:disable-next-line: max-line-length
  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) {

    this.cols = [
      { field: 'nombre', header: 'Insumo',  width: '30%' },
      { field: 'descripcion', header: 'Descripción',  width: '40%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '20%' },
      { field: '', header: '',  width: '10%' }
   ];
  }

  ngOnInit() {
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
  const ref = this.dialogService.open(InsumoEditarComponent, {
  data,
   header: 'Editar insumo',
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent: any) => {
        this.loadlist();
  });

}


nuevo() {

  const data: any = null;
  const ref = this.dialogService.open(InsumoEditarComponent, {
  data,
   header: 'Editar insumo',
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent: any) => {

        this.loadlist();
  });

}
}
