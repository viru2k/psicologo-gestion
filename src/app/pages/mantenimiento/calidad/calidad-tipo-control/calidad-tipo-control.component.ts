import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../../../../services/alert-service.service';
import { CalidadService } from './../../../../services/calidad.service';
import { MessageService, DialogService } from 'primeng/api';
import { CalidadTipoControlEditarComponent } from './calidad-tipo-control-editar/calidad-tipo-control-editar.component';

@Component({
  selector: 'app-calidad-tipo-control',
  templateUrl: './calidad-tipo-control.component.html',
  styleUrls: ['./calidad-tipo-control.component.scss'], 
  providers: [MessageService,DialogService]
})
export class CalidadTipoControlComponent implements OnInit {

  
  cols: any[];
  columns: any[];
  elementos:any[];
  selecteditems:any;
  loading;

  constructor(private alertServiceService: AlertServiceService, private calidadService: CalidadService, public dialogService: DialogService, private messageService: MessageService) { 

    this.cols = [
    
      { field: 'referencia_iso', header: 'referencia ISO',  width: '30%' },
      { field: 'referencia_descripcion', header: 'Descripción',  width: '40%' }, 
      { field: 'referencia_revision', header: 'Revisión',  width: '20%' },
      { field: '', header: 'Acción',  width: '10%' },
      
   ];     
  }

  ngOnInit() {
   // this.alertServiceService.throwAlert('success','Articulo guardado','','201');
    this.loadlist();
  }


  
  loadlist(){

    this.loading = true;  
    try {
        this.calidadService.getCalidadTipoControl()
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
  const ref = this.dialogService.open(CalidadTipoControlEditarComponent, {
  data,
   header: 'Editar control de calidad', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((CalidadTipoControlEditarComponent:any) => {
 
        this.loadlist()        ;             
 
  });

}


nuevo(){
  
  let data:any; 
 
  const ref = this.dialogService.open(CalidadTipoControlEditarComponent, {
  data,
   header: 'Crear control de calidad', 
   width: '98%',
   height: '90%'
  });

  ref.onClose.subscribe((ArticuloEditarComponent:any) => {
    
     
        this.loadlist()                     ;
      
  });

}

}
