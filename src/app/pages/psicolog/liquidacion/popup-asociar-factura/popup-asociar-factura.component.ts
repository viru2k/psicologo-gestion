import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/api';
import { PsicologoService } from './../../../../services/psicologo.service';
import { URL_ARCHIVO_SUBIDA,calendarioIdioma } from './../../../../config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-popup-asociar-factura',
  templateUrl: './popup-asociar-factura.component.html',
  styleUrls: ['./popup-asociar-factura.component.scss']
})
export class PopupAsociarFacturaComponent implements OnInit {
  public url: string  = URL_ARCHIVO_SUBIDA;
  datos: any;
  constructor(private miServico: PsicologoService, public config: DynamicDialogConfig) { }

  ngOnInit() {
    console.log(this.config.data);
    this.datos = this.config.data;
  }


  
  onUpload(event) { 
    /*  let  selectedEstudio_ =this.selectedEstudio['name'];  
       this._fechaHoy = formatDate(new Date(this.fechaHoy), 'yyyy-MM-dd HH:mm', 'en');
       console.log(event.files);
     //  let selectedReceta = this.listarecetas[0]['label'];
       for(let file of event.files) {
         this.estudio = new Estudios('',this.formPaciente.value.selectedEstudio['name'],this.formPaciente.value.paciente_id,this.formPaciente.value.medico_id,this._fechaHoy,this.userData['id'],file.name, URL_ARCHIVO,file.type, this.formPaciente.value.dni,this.formPaciente.value.SINTOMAS_SIGNOS);
         console.log(file.name);
         console.log(this.estudio);
         //  this.uploadedFiles.push(file);
         this.estudios.push(this.estudio);
       }
      
       
       
       console.log(this.estudios);
       this.uploadEstudioDatos(this.estudios); */
       console.log('subido');
       swal({
         type: 'success',
         title: 'Exito',
         text: 'Archiv subido con éxito'
       })
   }
 

}
