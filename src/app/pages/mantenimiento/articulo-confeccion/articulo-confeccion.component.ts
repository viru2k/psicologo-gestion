import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';
import { ArticuloConfeccionEditarComponent } from './../articulo-confeccion-editar/articulo-confeccion-editar.component';

@Component({
  selector: 'app-articulo-confeccion',
  templateUrl: './articulo-confeccion.component.html',
  styleUrls: ['./articulo-confeccion.component.scss'], 
  providers: [MessageService,DialogService]
})
export class ArticuloConfeccionComponent implements OnInit {
  cols: any[];
  colsConfeccion:any[];
  columns: any[];
  elementos:any[];
  elementosConfeccion:any[];
  selecteditems:any;
  loading;
  elemento:any;

  constructor(private alertServiceService: AlertServiceService, private articuloService: ArticuloService, public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'descripcion', header: 'Articulo',  width: '50%' },
      { field: 'unidad_descripcion', header: 'unidad',  width: '30%' },
      { field: '', header: 'Acción',  width: '20%' },
      
   ];    
   
   
    this.colsConfeccion = [
    
    { field: 'insumo_descripcion', header: 'Insumo',  width: '45%' },
    { field: 'cantidad', header: 'Cantidad',  width: '10%' },
    { field: 'VOLUMEN', header: 'Volumen',  width: '10%' },
    { field: 'unidad_descripcion', header: 'Unidad',  width: '20%' },
    { field: 'unidad', header: 'Unidad',  width: '10%' },    
    { field: '', header: 'Quitar',  width: '5%' }
    
 ];   
  }

  ngOnInit() {
   // this.alertServiceService.throwAlert('success','Articulo guardado','','201');
    this.loadlist();
  }


  
  loadlist(){

    this.loading = true;  
    try {
        this.articuloService.getArticulo()   
        .subscribe(resp => {
          if (resp[0]) {
            this.elementos = resp;
            console.log(this.elementos);
              }else{
                this.elementos =null;
              }
          this.loading = false;
          console.log(resp);
        },
        error => { // error path
            console.log(error);
            
            this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
         });    
    } catch (error) {
      this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
    }  
}


loadlistConfeccion(_elemento:any){
  this.elemento = _elemento;
  this.loading = true;  
  try {
      this.articuloService.getArticuloConfeccionByArticuloId(_elemento['id'])   
      .subscribe(resp => {
       
          this.elementosConfeccion = resp;
          console.log(this.elementosConfeccion);
         
          this.loading = false;
          console.log(resp);
      },
      error => { // error path
          console.log(error);
          
          this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
       });    
  } catch (error) {
    this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
  }  
}

buscar(){
  let data:any; 
  data = this.elemento;
  console.log(data);
  if(data){
  const ref = this.dialogService.open(ArticuloConfeccionEditarComponent, {
  data,
   header: 'Agregar insumo', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloConfeccionEditarComponent:any) => {
      if (ArticuloConfeccionEditarComponent) {
        console.log(ArticuloConfeccionEditarComponent); 
        this.guardarArticuloInsumo(ArticuloConfeccionEditarComponent);
        this.loadlist();
      }
  });
  }
}

editarInsumo(elemento:any){
  console.log(elemento);

  let data:any; 
  data = elemento;
  const ref = this.dialogService.open(ArticuloConfeccionEditarComponent, {
  data,
   header: 'Editar insumos de artículo', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe(() => {
     
    this.loadlistConfeccion(elemento['articulo_id']);
      
  });

}

guardarArticuloInsumo(_elemento){
  this.loading = true;  
  try {
      this.articuloService.setArticuloConfeccion(_elemento)   
      .subscribe(resp => {
       
          this.elementosConfeccion = resp;
          console.log(this.elementosConfeccion);
         
          this.loading = false;
          console.log(resp);
          this.loadlistConfeccion(this.elemento);
      },
      error => { // error path
          console.log(error);
          
          this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
       });    
  } catch (error) {
    this.alertServiceService.throwAlert('error','Error: '+error.status+'  Error al cargar los registros','', '500');
  }  
}

borrar(elemento){
  console.log('borrando');  
  this.loading = true;  
  try {
      this.articuloService.delArticuloProduccion(elemento['id'])   
      .subscribe(resp => {
       
        
          console.log(resp);
         
          this.loading = false;
          console.log(resp);
          this.loadlistConfeccion(this.elemento);
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

