import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertServiceService } from '../../../services/alert-service.service';
import { InsumoService } from './../../../services/insumo.service';

@Component({
  selector: 'app-insumo-editar',
  templateUrl: './insumo-editar.component.html',
  styleUrls: ['./insumo-editar.component.scss']
})
export class InsumoEditarComponent implements OnInit {

  updateDataForm: FormGroup;
  elementos: any;
  unidades: any;
  unidad: string;
  es_nuevo;
  loading;
  selectedItem: any;
  selectedForma: any;
  userData: any;

  constructor(public config: DynamicDialogConfig, private insumoService: InsumoService,
              private alertServiceService: AlertServiceService, public ref: DynamicDialogRef) {

    this.updateDataForm = new FormGroup({
      'id': new FormControl('', ),
      'nombre': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
      'unidad_descripcion': new FormControl(''),
      'unidad_id': new FormControl('1'),
      'usuario_modifica_id': new FormControl('', )

  });
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.config.data);
    if (this.config.data) {
      console.log('es editable');
      this.es_nuevo = false;
    }else{
      this.es_nuevo = true;
      console.log('es nuevo');
    }
     this.loadUnidad();
  }



  loadUnidad() {

    this.loading = true;
    try {
        this.insumoService.getUnidad()
        .subscribe(resp => {
            this.unidades = resp;
            console.log(this.unidades);
            this.loading = false;
            console.log(resp);
            if (this.config.data) {
            this.selectedForma =  this.unidades.find(x => x.id === this.config.data.unidad_id);
            console.log(this.selectedForma.descripcion);
            this.updateDataForm.patchValue(this.config.data);
            this.updateDataForm.patchValue({unidad_id: this.selectedForma.id });
            this.updateDataForm.patchValue({unidad_descripcion: this.selectedForma.descripcion });
            this.updateDataForm.patchValue({usuario_modifica_id: this.userData.id});
            console.log(this.updateDataForm.value);
            }
        },
        error => { // error path
            console.log(error);
            this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
         });
    } catch (error) {
      this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
    }
}


  guardarDatos() {

    if (this.es_nuevo) {
      this.loading = true;
      try {
        this.updateDataForm.patchValue({usuario_modifica_id: this.userData['id']});
        this.insumoService.setInsumo(this.updateDataForm.value)
        .subscribe(resp => {
            this.loading = false;
            console.log(resp);
            this.ref.close();
        },
        error => { // error path
          console.log(error);
          this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
       });
  } catch (error) {
    this.alertServiceService.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', '', '500');
  }
    } else {

      console.log(this.updateDataForm.value['id']);
      this.updateDataForm.patchValue({unidad_id: this.selectedForma.id });
      this.updateDataForm.patchValue({unidad_descripcion: this.selectedForma.descripcion });
      this.updateDataForm.patchValue({usuario_modifica_id: this.userData['id']});
      console.log(this.updateDataForm);
      try {
        this.insumoService.updateInsumo(this.updateDataForm.value, this.updateDataForm.value['id'])
        .subscribe(resp => {
          this.loading = false;
          console.log(resp);
          this.ref.close();
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

}
