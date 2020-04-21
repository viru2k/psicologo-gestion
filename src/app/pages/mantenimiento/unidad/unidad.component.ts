import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../../../services/insumo.service';
import { AlertServiceService } from '../../../services/alert-service.service';
import { MessageService, DialogService } from 'primeng/api';
import { InsumoEditarComponent } from './../insumo-editar/insumo-editar.component';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {

  cols: any[];
  columns: any[];
  elementos:any[];
  selecteditems:any;
  loading;

  constructor(private insumoService: InsumoService, private alertServiceService: AlertServiceService,  public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'descripcion', header: 'Insumo',  width: '50%' },
      { field: 'unidad_descripcion', header: 'Unidad',  width: '30%' },
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
        this.insumoService.getInsumo()   
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
  const ref = this.dialogService.open(InsumoEditarComponent, {
  data,
   header: 'Editar insumo', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent:any) => {
 
        this.loadlist();
 
  });

}


nuevo(){
  
  let data:any; 
 
  const ref = this.dialogService.open(InsumoEditarComponent, {
  data,
   header: 'Editar insumo', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent:any) => {
    
     
        this.loadlist()                     ;
      
  });

}
}
