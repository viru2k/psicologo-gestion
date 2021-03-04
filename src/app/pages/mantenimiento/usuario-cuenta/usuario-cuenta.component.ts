import { Component, OnInit } from '@angular/core';
import { PsicologoService } from './../../../services/psicologo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-cuenta',
  templateUrl: './usuario-cuenta.component.html',
  styleUrls: ['./usuario-cuenta.component.scss']
})
export class UsuarioCuentaComponent implements OnInit {

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
}
