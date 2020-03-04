import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { ArticuloService } from './../../../../services/articulo.service';
import { AlertServiceService } from './../../../../services/alert-service.service';
import { InsumoService } from './../../../../services/insumo.service';

@Component({
  selector: 'app-popup-insumo-consulta',
  templateUrl: './popup-insumo-consulta.component.html',
  styleUrls: ['./popup-insumo-consulta.component.scss']
})
export class PopupInsumoConsultaComponent implements OnInit {

  
  cols: any[];
  columns: any[];
  elementos:any[];
  selecteditems:any;
  loading;

  constructor(private alertServiceService: AlertServiceService, private insumoService: InsumoService, public ref: DynamicDialogRef) { 

    this.cols = [
    
      { field: 'descripcion', header: 'Insumo',  width: '50%' },
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

guardar(elemento){
  this.ref.close(elemento);
}

}
