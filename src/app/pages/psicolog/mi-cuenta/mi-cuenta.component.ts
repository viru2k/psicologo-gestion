import { Component, OnInit } from '@angular/core';
import { PsicologoService } from './../../../services/psicologo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']
})
export class MiCuentaComponent implements OnInit {

  display: boolean = false;
  elementos:any[] = [];
  elementos_videos:any[] = [];
  elemento_detalle:any = null;
  loading:boolean = false;
  
  errorvideo:boolean;
  errornoticia:boolean;
  mat_matricula:string;
  mat_email:string;
  token:string;
  retypepassword:string;
  password:string;
  
  constructor(private miServicio:PsicologoService) { }

  ngOnInit() {
  }

  guardarCorreo(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.mat_matricula = userData['name'];
    this.errornoticia = false;
    this.loading = true;
       try {
           this.miServicio.actualizarEmail(this.mat_matricula, this.mat_email)
           .subscribe(resp => {
             let i=0;
             let res = resp;
                
               this.elementos = resp;
               console.log(this.elementos );
               this.loading = false;
               swal({
                type: 'success',
                title: 'Exito',
                text: 'Se modifico el correo'
              })
           },
           error => { // error path
               console.log(error);
               console.log(error.status);
             this.errornoticia = true;
               this.loading = false;
            });
       } catch (error) {
        this.errornoticia = true;
       }
  }

  modificarPassword(){
    if(this.password === this.retypepassword){
      this.loading = true;
      try {
          this.miServicio.actualizarPassword(this.token, this.password)
          .subscribe(resp => {
            let i=0;
            let res = resp;
               
              this.elementos = resp;
              console.log(this.elementos );
              this.loading = false;
              swal({
               type: 'success',
               title: 'Exito',
               text: 'Se modifico el correo'
             })
          },
          error => { // error path
              console.log(error);
              console.log(error.status);
            this.errornoticia = true;
              this.loading = false;
           });
      } catch (error) {
       this.errornoticia = true;
      }

    }else{
      swal({
        
        type: 'warning',
        title: 'Las contraseñas no coinciden',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  throwAlert(estado: string, mensaje: string, motivo: string, errorNumero: string){
    let tipoerror:string;
  
    if(estado== 'success'){
        swal({
            type: 'success',
            title: 'Exito',
            text: mensaje
          })
    }
  
    if(errorNumero =='422'){
      mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
      swal({   
          type: 'warning',
          title: 'Atención..',
          text: mensaje,
          footer: motivo
        })
  }
    
    if((estado== 'error')&&(errorNumero!='422')){
      if(errorNumero =='422'){
          mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
      }
      if(errorNumero =='400 '){
          mensaje ='Bad Request ';
      }
      if(errorNumero =='404'){
          mensaje ='No encontrado ';
      }
      if(errorNumero =='401'){
          mensaje ='Sin autorización';
      }
      if(errorNumero =='403'){
          mensaje =' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
      }
      if(errorNumero =='405'){
          mensaje ='Método no permitido';
      }
      if(errorNumero =='500'){
          mensaje ='Error interno en el servidor';
      }
      if(errorNumero =='503'){
          mensaje ='Servidor no disponible';
      }
      if(errorNumero =='502'){
          mensaje ='Bad gateway';
      }
      
        swal({
            type: 'error',
            title: 'Oops...',
            text: mensaje,
            footer: motivo
          })
    }
  
  
  }
  }
