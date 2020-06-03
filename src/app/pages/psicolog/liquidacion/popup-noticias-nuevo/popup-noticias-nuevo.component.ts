import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { PsicologoService } from '../../../../services/psicologo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { calendarioIdioma } from './../../../../config/config';

@Component({
  selector: 'app-popup-noticias-nuevo',
  templateUrl: './popup-noticias-nuevo.component.html',
  styleUrls: ['./popup-noticias-nuevo.component.scss']
})
export class PopupNoticiasNuevoComponent implements OnInit {

  
  
  updateDataForm: FormGroup;
  elementos: any;
  unidades: any;
  unidad: string;
  es_nuevo;
  loading;
  selectedItem: any;
  selectedForma: any;
  userData: any;
  estadoArray: any[] = [];
  selectedEstado: string = 'ACTIVO' ;
  fecha: Date;
  _fecha: string;
  es: any;

  constructor(public config: DynamicDialogConfig, private psicologoService: PsicologoService, public ref: DynamicDialogRef) {

    this.updateDataForm = new FormGroup({
      'id': new FormControl('', ),
      'titulo': new FormControl(''),
      'descripcion': new FormControl(''),
      'pagina': new FormControl(''),
      'fecha_creacion': new FormControl(''),
      'tiene_enlace': new FormControl(''),
      'enlace': new FormControl(''),
      'tiene_imagen': new FormControl(''),
      'imagen': new FormControl(''),
      'es_youtube': new FormControl(''),
      'enlace_video_youtube': new FormControl(''),
      'es_video': new FormControl(''),
      'enlace_video': new FormControl(''),
      'es_importante': new FormControl(''),
      'estado': new FormControl(''),
      'es_curso': new FormControl(''),
      'boolean_tiene_enlace': new FormControl(''),
      'boolean_tiene_imagen': new FormControl(''),
      'boolean_es_youtube': new FormControl(''),
      'boolean_es_video': new FormControl(''),
      'boolean_es_importante': new FormControl(''),
      'selectedEstado': new FormControl(''),
      'boolean_es_curso': new FormControl(''),
      'busqueda': new FormControl(''),
      'files': new FormControl(''),
      
  });

  this.estadoArray = [
    {name: 'ACTIVO',      value: 'ACTIVO'},
   
    {name: 'INACTIVO',   value: 'INACTIVO'}
];
  }


  ngOnInit() {
    this.es = calendarioIdioma  ;
    this.fecha = new Date();

    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.config.data);
    if (this.config.data) {
      console.log('es editable');
      this.es_nuevo = false;
      this.updateDataForm.patchValue(this.config.data);
      this.updateDataForm.patchValue({estado: this.config.data.estado})  ;
      this.updateDataForm.patchValue({selectedEstado: this.config.data.estado})  ;
      this.updateDataForm.patchValue({fecha_creacion: new Date(this.config.data.created_at)})  ;

      this.updateDataForm.patchValue({boolean_tiene_enlace: this.validarEstadoTextoToBoolean(this.config.data.tiene_enlace)  });
      this.updateDataForm.patchValue({boolean_tiene_imagen: this.validarEstadoTextoToBoolean(this.config.data.tiene_imagen)  });
      this.updateDataForm.patchValue({boolean_es_youtube: this.validarEstadoTextoToBoolean(this.config.data.es_youtube)  });
      this.updateDataForm.patchValue({boolean_es_video: this.validarEstadoTextoToBoolean(this.config.data.es_video)  });
      this.updateDataForm.patchValue({boolean_es_importante: this.validarEstadoTextoToBoolean(this.config.data.es_importante)  });
      this.updateDataForm.patchValue({boolean_es_curso: this.validarEstadoTextoToBoolean(this.config.data.es_curso)  });
      console.log(this.updateDataForm.value);

    }else{
      this.updateDataForm.patchValue({busqueda: 'PRIVADA'})  ;
      this.updateDataForm.patchValue({fecha_creacion: this.fecha})  ;
      this.es_nuevo = true;
      console.log('es nuevo');
    }
  }

  validarEstadoTextoToBoolean(val)  {
    if (val === 'SI') {
      return true;
    } else {
      return false;
    }
  }

  validarEstadoBooleanToTexto(val) {
    if (val) {
      return 'SI';
    } else {
      return 'NO';
    }
  }

  onChangeEstado(e) {
    console.log(e.target.value);
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

  myUploader(event) {
    //event.files == files to upload
    console.log(event);
    console.log(event.file);
    this.updateDataForm.patchValue({files: event  });
    console.log(this.updateDataForm.value);
    this.editarNoticia();
}

  guardarDatos() {
    this.updateDataForm.patchValue({tiene_enlace: this.validarEstadoBooleanToTexto(this.updateDataForm.value.boolean_tiene_enlace)  });
    this.updateDataForm.patchValue({tiene_imagen: this.validarEstadoBooleanToTexto(this.updateDataForm.value.boolean_tiene_imagen)  });
    this.updateDataForm.patchValue({es_youtube: this.validarEstadoBooleanToTexto( this.updateDataForm.value.boolean_es_youtube)  });
    this.updateDataForm.patchValue({es_video: this.validarEstadoBooleanToTexto( this.updateDataForm.value.boolean_es_video)  });
    this.updateDataForm.patchValue({es_importante: this.validarEstadoBooleanToTexto( this.updateDataForm.value.boolean_es_importante)  });
    this.updateDataForm.patchValue({es_curso: this.validarEstadoBooleanToTexto( this.updateDataForm.value.boolean_es_curso)  });
    console.log(this.updateDataForm.value);
     if (this.es_nuevo) {
   //   this.nuevaNoticia();
    } else {
     // this.editarNoticia();
    } 
  }

  nuevaNoticia() {
    this.loading = true;
    try {
      this.psicologoService.postNoticiaPrivada(this.updateDataForm.value)
      .subscribe(resp => {
          this.loading = false;
          console.log(resp);
          this.ref.close(resp);
      },
      error => { // error path
        console.log(error);
        this.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
     });
} catch (error) {
  this.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
}
  }

  editarNoticia() {

    console.log(this.updateDataForm);
    try {
      this.psicologoService.putNoticiaPrivada( this.updateDataForm.value, this.updateDataForm.value.id)
      .subscribe(resp => {
        this.loading = false;
        console.log(resp);
        this.ref.close(resp);
      },
      error => { // error path
        console.log(error);
        this.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
     });
} catch (error) {
  this.throwAlert('error', 'Error: ' + error.status + '  Error al cargar los registros', error.message, error.status);
}
  }

  throwAlert(estado: string, mensaje: string, motivo: string, errorNumero: string) {

    if (estado === 'success') {
         swal({
             type: 'success',
             title: 'Exito',
             text: mensaje
           } );
     }
     if (estado === 'error') {
       if (errorNumero === '422') {
           mensaje = 'Los datos que esta tratando de guardar son iguales a los que ya poseia';
       }
       if (errorNumero === '400 ') {
           mensaje = 'Bad Request ';
       }
       if (errorNumero === '404') {
           mensaje = 'No encontrado ';
       }
       if (errorNumero === '401') {
           mensaje = 'Sin autorización';
       }
       if (errorNumero === '403') {
           mensaje = ' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
       }
       if (errorNumero === '405') {
           mensaje = 'Método no permitido';
       }
       if (errorNumero === '500') {
           mensaje = 'Error interno en el servidor';
       }
       if (errorNumero === '503') {
           mensaje = 'Servidor no disponible';
       }
       if (errorNumero === '502') {
           mensaje = 'Bad gateway';
       }
  
         swal({
             type: 'error',
             title: 'Oops...',
             text: mensaje,
             footer: motivo
           });
     }
     if (estado === 'alerta') {
       swal({
           type: 'warning',
           title: 'Cuidado!',
           text: mensaje,
           footer: motivo
         });
   }
   }
  }
  