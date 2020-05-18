import { Component, OnInit } from '@angular/core';
import { MessageService, DialogService, DynamicDialogRef } from 'primeng/api';
import { AlertServiceService } from './../../../../../services/alert-service.service';
import { CalidadService } from './../../../../../services/calidad.service';



@Component({
  selector: 'app-popup-find-calidad-parametro',
  templateUrl: './popup-find-calidad-parametro.component.html',
  styleUrls: ['./popup-find-calidad-parametro.component.scss']
})
export class PopupFindCalidadParametroComponent implements OnInit {

  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;

  constructor(private calidadService: CalidadService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService, public ref: DynamicDialogRef) { 

    this.cols = [

      { field: 'parametro', header: 'Parámetro',  width: '80%' },
      { field: '', header: 'Acción',  width: '20%' },

   ];
  }

  ngOnInit() {
    console.log('cargando insumo');
    this.loadlist();
  }

  loadlist(){

    this.loading = true;
    try {
        this.calidadService.getCalidadControlParametros()
        .subscribe(resp => {
          if (resp[0]) {
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
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}

guardar(elemento: any) {
  console.log(elemento);
 this.ref.close(elemento);

}


}

