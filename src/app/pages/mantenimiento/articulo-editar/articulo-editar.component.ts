import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticuloService } from './../../../services/articulo.service';
import { AlertServiceService } from '../../../services/alert-service.service';
@Component({
  selector: 'app-articulo-editar',
  templateUrl: './articulo-editar.component.html',
  styleUrls: ['./articulo-editar.component.scss']
})
export class ArticuloEditarComponent implements OnInit {
  updateDataForm: FormGroup;
  elementos:any;
  unidades:any;
  unidad:string;
  es_nuevo;
  loading;
  selectedItem:any;
  selectedForma:any;
  constructor(public config: DynamicDialogConfig, private articuloService:ArticuloService, private alertServiceService:AlertServiceService, public ref: DynamicDialogRef) { 
    this.updateDataForm = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'unidad_descripcion': new FormControl(''),
      'unidad_id': new FormControl('1'),
      'botellas': new FormControl('1'),
      'pisos': new FormControl('1'),
      'pack': new FormControl('1'),
      'litros': new FormControl('1'),
      'id': new FormControl('' ),
     
  });
  }

  ngOnInit() {
    console.log(this.config.data);
    if(this.config.data){
      console.log('es editable');
      this.es_nuevo = false;
    

    }else{
      this.es_nuevo = true;
      console.log('es nuevo');
    }
     this.loadUnidad();
  }



  loadUnidad(){

    this.loading = true;  
    try {
        this.articuloService.getUnidad()   
        .subscribe(resp => {
            this.unidades = resp;
            console.log(this.unidades);              
            this.loading = false;
            console.log(resp);
            if(this.config.data){
            this.selectedForma =  this.unidades.find(x => x.id === this.config.data.unidad_id);
            console.log(this.selectedForma.descripcion);  
            this.updateDataForm.patchValue(this.config.data);
            this.updateDataForm.patchValue({unidad_id: this.selectedForma.id });
            this.updateDataForm.patchValue({unidad_descripcion: this.selectedForma.descripcion });
            console.log(this.updateDataForm.value);
            }
            
      
        },
        error => { // error path
            console.log(error);
            
            this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
         });    
    } catch (error) {
      this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
    }  
}


  guardarDatos(){

    
    
    if(this.es_nuevo){
      this.loading = true;  
      try {

        this.articuloService.setArticulo(this.updateDataForm.value)   
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

      console.log(this.updateDataForm.value['id']);
      this.updateDataForm.patchValue({unidad_id: this.selectedForma.id });
      this.updateDataForm.patchValue({unidad_descripcion: this.selectedForma.descripcion });
      console.log(this.updateDataForm);
      try {
        this.articuloService.updateArticulo(this.updateDataForm.value, this.updateDataForm.value['id'])   
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
