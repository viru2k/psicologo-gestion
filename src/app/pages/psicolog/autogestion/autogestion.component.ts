import { Component, OnInit } from '@angular/core';
import { URL_ARCHIVO_SUBIDA,calendarioIdioma } from './../../../config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-autogestion',
  templateUrl: './autogestion.component.html',
  styleUrls: ['./autogestion.component.scss']
})
export class AutogestionComponent implements OnInit {
  uploadedFiles: any[] = [];
  public url:string  = URL_ARCHIVO_SUBIDA;
  userData:any;
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
   }

  ngOnInit() {
    console.log(this.userData);
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
