import { Component, OnInit } from '@angular/core';
import { DialogService, MessageService, DynamicDialogConfig } from 'primeng/api';
import { PsicologoService } from '../../../services/psicologo.service';
import swal from 'sweetalert2';

import { URL_ARCHIVO_FACTURA } from './../../../config/config';
import { AlertServiceService } from '../../../services/alert-service.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss']
})
export class FacturacionComponent implements OnInit {

  datos: any;
  cols: any;
  loading;
  descarga: string;
  elementos: any[] = [];
  userData: any = null;
  constructor(private miServico: PsicologoService,  private alertServiceService: AlertServiceService) {

    this.cols = [

      { field: 'id_liquidacion', header: 'Liq. nº' , width: '10%'} ,
      { field: 'mat_matricula', header: 'Matrícula' , width: '15%'},
      { field: 'matricula_psicologo', header: 'Psicólogo' , width: '50%'},
      { field: 'fecha_subida', header: 'Subido' , width: '15%'},
      {field: 'boton', header: '' , width: '10%'},
   ];

   }

  ngOnInit() {
     this.userData = JSON.parse(localStorage.getItem('userData'));
    this.descarga = URL_ARCHIVO_FACTURA;

    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loadList();
  }

  loadList() {

    this.loading = true;
    try {
        this.miServico.getFacturaByMatricula(this.userData['username'])
        .subscribe(resp => {
        this.elementos = resp;
            this.loading = false;
            console.log(resp);


        },
        error => { // error path
            console.log(error.message);
            console.log(error.status);
            this.loading = false;
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
         });
    } catch (error) {
    this.alertServiceService.throwAlert('error' , 'Error al cargar los registros' , error , error.status);
    }
}
}
