





import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import swal from 'sweetalert2';

import { DialogService } from 'primeng/components/common/api';
import { DatePipe } from '@angular/common';
import { AlertServiceService } from './../../../services/alert-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService, DialogService, DatePipe]
})
export class NavbarComponent implements OnInit {

  user: User;
  general: MenuItem[];
  mantenimiento = true;
  gestion_auditoria  = true;
  administarcion_auditoria  = true;
  gestion_produccion = true;
  administracion_produccion = true;
  gestion_stock = true;
  administracion_stock = true;
  gerencia = true;
  movil_calidad = true;
  movil_insumo = true;
  userData: any = null;


  public username: string;
  public puesto: string;
  public nombreyapellido: string;
  public email: string;
  elemento: User = null;




  returnUrl: string;
  error = '';
  notificaciones = 0;
  chats;
  currentUser = null;

  constructor(
    private alertServiceService: AlertServiceService,
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private miServico: UserService) {

  }
 navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit() {

     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     console.log(this.currentUser);
     if (this.currentUser) {
       this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log(this.userData);
      console.log('usuario logueado');
      this.username = this.userData.username;
      this.nombreyapellido = this.userData.nombreyapellido;
      this.email = this.userData.email;
     // console.log(this.userData.access_list);
     // this.asignarModulos(this.userData.access_list);
   } else {
    this.router.navigate(['/login']);
   }

  }



  asignarModulos(modulos: any) {
    modulos.forEach(element => {
     // console.log(element['modulo_nombre']);
      if (element.modulo_nombre === 'mantenimiento') {
        this.mantenimiento = false;
      }
      if (element.modulo_nombre === 'gestion_auditoria') {
        this.gestion_auditoria = false;
      }
      if (element.modulo_nombre === 'administarcion_auditoria') {
        this.administarcion_auditoria = false;
        console.log( element.modulo_nombre);
      }
      if (element.modulo_nombre === 'gestion_produccion') {
        this.gestion_produccion = false;
      }
      if (element.modulo_nombre === 'administracion_produccion') {
        this.administracion_produccion = false;
      }
      if (element.modulo_nombre === 'gestion_stock') {
        this.gestion_stock = false;
      }
      if (element.modulo_nombre === 'administracion_stock') {
        this.administracion_stock = false;
      }
      if (element.modulo_nombre === 'gerencia') {
        this.gerencia = false;
      }

      if (element.modulo_nombre === 'movil_calidad') {
        this.movil_calidad = false;
      }

      if (element.modulo_nombre === 'movil_insumo') {
        this.movil_insumo = false;
      }

    });

    /** DESPUES DE ASIGNAR MODULOS VERIFICO LAS NOTIFICACIONES */

  }



accion(evt: any, overlaypanel: OverlayPanel) {

  console.log(evt);
  overlaypanel.toggle(evt);
}


cerrarSesion() {

  swal({
  title: 'Cerrando sesión',
  text: '¿Desea finalizar la sesión actual?',
  showCancelButton: true,
  confirmButtonColor: '#E53935',
  cancelButtonColor: '#42A5F5',
  cancelButtonText: 'Permanecer',
  confirmButtonText: 'Cerrar sesión',
  imageUrl: 'https://img.icons8.com/clouds/100/000000/imac-exit.png',
  imageHeight: 128,
  imageWidth: 128,
}).then((result) => {
  if (result.value) {

  console.log('sesion terminada');
  this.authenticationService.logout();



  this.gestion_auditoria  = true;
  this.administarcion_auditoria  = true;
  this.gestion_produccion = true;
  this.administracion_produccion = true;
  this.gestion_stock = true;
  this.administracion_stock = true;
  this.gerencia = true;
  this.movil_calidad = true;
  this.movil_insumo = true;




  this.user = null;
  this.elemento = null;
  localStorage.removeItem('userData');
  window.location.reload();
  }
});
}




ver() {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser.access_token);
}




}












