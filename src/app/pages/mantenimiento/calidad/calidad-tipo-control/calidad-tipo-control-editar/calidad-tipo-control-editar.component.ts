import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalidadService } from './../../../../../services/calidad.service';
import { AlertServiceService } from '../../../../../services/alert-service.service';

@Component({
  selector: 'app-calidad-tipo-control-editar',
  templateUrl: './calidad-tipo-control-editar.component.html',
  styleUrls: ['./calidad-tipo-control-editar.component.scss']
})
export class CalidadTipoControlEditarComponent implements OnInit {

  updateDataForm: FormGroup;
  elementos:any;
  unidades:any;
  unidad:string;
  es_nuevo;
  loading;
  selectedItem:any;
  selectedForma:any;
  constructor(public config: DynamicDialogConfig, private calidadService:CalidadService, private alertServiceService:AlertServiceService, public ref: DynamicDialogRef) { 
    this.updateDataForm = new FormGroup({
      'id': new FormControl('0'),
      'referencia_iso': new FormControl('', Validators.required),
      'referencia_revision': new FormControl(''),
      'referencia_descripcion': new FormControl('1'),
      'usuario_alta_id': new FormControl('' ),
     
  });

  }

  ngOnInit() {
   // console.log(this.config.data);
   
    if(this.config.data){
      console.log('es editable');
      this.es_nuevo = false;
      this.updateDataForm.patchValue(this.config.data);

    }else{
      this.es_nuevo = true;
      console.log('es nuevo');
    }     
  }



  guardarDatos(){

    const userData = JSON.parse(localStorage.getItem('userData'));

        this.updateDataForm.patchValue({usuario_alta_id: userData['id']});
    if(this.es_nuevo){
      this.loading = true;  
      try {

        this.calidadService.setCalidadTipoControl(this.updateDataForm.value)   
        .subscribe(resp => {
         
            this.loading = false;
            console.log(resp);
            this.ref.close();
        },
        error => { // error path
            console.log(error);
            
            this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
         });    
    } catch (error) {
      this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
    }  
    }else{

     
      console.log(this.updateDataForm);
      try {
        this.calidadService.updateCalidadTipoControl(this.updateDataForm.value, this.updateDataForm.value['id'])   
        .subscribe(resp => {
         
          this.loading = false;
          console.log(resp);
          this.ref.close();
        },
        error => { // error path
            console.log(error);
            
            this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
         });    
    } catch (error) {
      this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
    }  
    }
  }

}
