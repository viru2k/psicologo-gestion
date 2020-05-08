import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from './../../../services/alert-service.service';
import { ProduccionService } from './../../../services/produccion.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {

  loading;
  mensajeCarga: string;

/* ------------------------------- INDICADORES ------------------------------ */

procesosActivos: number;

  constructor(private alertServiceService: AlertServiceService, private produccionService: ProduccionService) {

  }

  ngOnInit() {
    this.loadProcesos();
  }


  
  loadProcesos() {
    this.mensajeCarga = 'CARGANDO PROCESOS ACTIVOS';
    this.loading = true;
    try {
        this.produccionService.getProduccionProcesoByEstado()
        .subscribe(resp => {
            console.log(resp);
            this.loading = false;
            console.log(resp);
            this.procesosActivos = resp.length;
         //   this.mensajeCarga = '';
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
  }
}
