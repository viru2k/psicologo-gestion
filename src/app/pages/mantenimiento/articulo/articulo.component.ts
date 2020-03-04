import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../services/alert-service.service';
import { ArticuloService } from './../../../services/articulo.service';
import { MessageService, DialogService } from 'primeng/api';
import { ArticuloEditarComponent } from './../articulo-editar/articulo-editar.component';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'], 
  providers: [MessageService,DialogService]
})
export class ArticuloComponent implements OnInit {

  cols: any[];
  columns: any[];
  elementos:any[];
  selecteditems:any;
  loading;

  constructor(private alertServiceService: AlertServiceService, private articuloService: ArticuloService, public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'descripcion', header: 'Articulo',  width: '50%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '30%' },
      { field: '', header: 'Acción',  width: '20%' },
      
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

buscar(elemento:any){
  console.log(elemento);
  let data:any; 
 data = elemento;
  const ref = this.dialogService.open(ArticuloEditarComponent, {
  data,
   header: 'Editar artículo', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent:any) => {
 
        this.loadlist()        ;             
 
  });

}


nuevo(){
  
  let data:any; 
 
  const ref = this.dialogService.open(ArticuloEditarComponent, {
  data,
   header: 'Editar artículo', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent:any) => {
    
     
        this.loadlist()                     ;
      
  });

}

}
