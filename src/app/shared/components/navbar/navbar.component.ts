
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';

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
  loggedIn = false;
  general: MenuItem[];
  mantenimiento = true;
  gestion_auditoria  = true;
  administarcion_auditoria  = true;
  gestion_produccion = true;
  administracion_produccion = true;
  gestion_stock = true;
  administracion_stock = true;
  gerencia = true;


  public username: string;
  public puesto: string;
  elemento: User = null;
  elementoModulo:[] = null;
  loginForm: FormGroup;
  loading = false;
  loading_mensaje: string;
  loading_error;
  submitted = false;
  returnUrl: string;
  error = '';
  notificaciones = 0;
  chats;

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

   /*======== JQUERY DEL LOGUIN =========*/
   $(document).ready
   (function ($) {
     "use strict";
 
 
     /*==================================================================
     [ Focus Contact2 ]*/
     $('.input100').each(function() {
         $(this).on('blur', function() {
             if ($(this).val() !== "") {
                 $(this).addClass('has-val');
             }
             else {
                 $(this).removeClass('has-val');
             }
         })    
     })
   
   
     /*==================================================================
     [ Validate ]*/
     var input = $('.validate-input .input100');
 
     $('.validate-form').on('submit',function() {
         var check = true;
 
         for(var i=0; i<input.length; i++) {
          
         }
 
         return check;
     });
 
 
     $('.validate-form .input100').each(function() {
         $(this).focus(function() {
            hideValidate(this);
         });
     });
 

 
     function showValidate(input) {
         var thisAlert = $(input).parent();
 
         $(thisAlert).addClass('alert-validate');
     }
 
     function hideValidate(input) {
         var thisAlert = $(input).parent();
 
         $(thisAlert).removeClass('alert-validate');
     }
     
 
 });

      /*======== FIN JQUERY DEL LOGUIN =========*/

   this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

   console.log(this.f.username.value);
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

   if (currentUser.access_token !== '') {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    console.log('usuario logueado');
    this.loggedIn = true;
    this.username = userData.username;
    console.log(userData.access_list);
    this.asignarModulos(userData.access_list);
    this.menuList();
   } else {
    console.log('sin credenciales');
    // tslint:disable-next-line: max-line-length
    this.alertServiceService.throwAlert('error', 'Usuario o contraseña incorrectos',  'Verifique el usuario y contraseña, su sesion puede haber expirado', '500');
  }
  }

accion(evt: any, overlaypanel: OverlayPanel) {

  console.log(evt);
  overlaypanel.toggle(evt);
}

ajustes() {
  console.log('ajustes');
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

  });

  /** DESPUES DE ASIGNAR MODULOS VERIFICO LAS NOTIFICACIONES */

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
  this.loggedIn = false;
  this.mantenimiento = true;
  this.gestion_auditoria = true;
  this.administarcion_auditoria = true;
  this.gestion_produccion = true;
  this.administracion_produccion = true;
  this.gestion_stock = true;
  this.administracion_stock = true;
  this.user = null;
  this.elemento = null;
  this.elementoModulo = [];
  window.location.reload();
  }
});
}


get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.loading_mensaje = 'Validando usuario';
  this.authenticationService.login(this.f.username.value, this.f.password.value)
     // .pipe(first())
      .subscribe(
          data => {
            console.log(data);
            this.user = data;
            const us = new User('', '', '', '', '', this.f.username.value, this.f.password.value, []);
            localStorage.setItem('userData', JSON.stringify(us));
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            //  this.router.navigate([this.returnUrl]);
            this.loadUser();
          },
          error => {
            console.log(error);
            if (error === 'Las credenciales del usuario son incorrectas') {
              this.loading_error = true;
              this.loading = false;
              this.loading_mensaje = '';
             } else {
              this.loading = false;
              this.loading_mensaje = '';
            }
            this.error = error;
          });
}

ver() {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser.access_token);
}

loadUser() {

this.loading = true;
try {
  this.loading_mensaje = 'Obteniendo modulos del usuario';
  this.miServico.getItemInfoAndMenu(this.f.username.value)
    .subscribe(resp => {
    this.elemento = resp;
    const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.elemento);
    this.elementoModulo = <any>this.elemento;
    this.user = new User(this.elemento[0].id , this.elemento[0].email, this.elemento[0].nombreyapellido,
    this.elemento[0].name, this.elemento[0].admin, this.elemento[0].email, currentUser.access_token, this.elementoModulo);
    this.username = userData['username'];
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(this.user));
    this.asignarModulos(this.elementoModulo);
    this.loading = false;
    this.loading_mensaje = '';
    console.log('logueado');
    this.loggedIn = true;
    this.menuList();
    },
    error => {
        console.log(error.message);
        console.log(error.status);
        localStorage.removeItem('error');
        localStorage.setItem('error', JSON.stringify(error));
        this.loading_mensaje = '';

     });
} catch (error) {
}
}


menuList() {

  this.general = [

    {

      label: 'Producción',
      visible: !this.gestion_produccion,
      items: [
        {
          label: 'Stock',
          visible: !this.administracion_produccion,
          items: [
            {label: 'Ingresar insumos', visible: !this.gestion_produccion, routerLink: '/insumo/stock/ingreso'},
            {label: 'Stock de insumos', routerLink: '/insumo/stock'},
            {label: 'Indicadores de stock', routerLink: '/insumo/indicadores'},
          ]
      },
        {
            label: 'Producción',
            visible: !this.administracion_produccion,
            items: [
              {label: 'Orden de producción', visible: !this.gestion_produccion, routerLink: 'orden/produccion'},
              {label: 'Detalle de ordenes de producción', routerLink: '/produccion/ingreso'},
              {label: 'Proceso de producción', routerLink: '/produccion/proceso'},
            ]
        },
        {
          label: 'Gestión de producción',
          visible: !this.gestion_produccion,
          items: [
            {label: 'Cargar producción', routerLink: 'produccion/ingreso'},
            {label: 'Asociar insumos a producción', routerLink: 'produccion/asociar/insumo'},
            {label: 'Movimientos de producción', routerLink: 'produccion/movimientos'},
            {label: 'Movimientos de insumos', routerLink: 'insumo/movimientos'},
          ]
      },

      ]
  },
  {
    label: 'Gerencia',
    visible: !this.gerencia,
    items: [
      {label: 'Producción', routerLink: 'orden/produccion'},
      {label: 'Procesos de producción', routerLink: '/produccion/proceso'},
      {label: 'Control de calidad', routerLink: 'control/calidad'},
      {label: 'Controles de realizados', routerLink: '/control/calidad/produccion'},
      {label: 'Insumos', routerLink: 'gerencia/insumo'},
    ]
  },

  {
    label: 'Auditoria',
    visible: !this.gestion_auditoria,
    items: [
      {label: 'Control de producción', routerLink: '/control/calidad/produccion'},
      {
            label: 'Indicadores',
            items: [
              {label: 'Controles realizados', visible: !this.gestion_auditoria, routerLink: '/control/calidad'},
              {label: 'Indicadores de máquina', visible: !this.gestion_auditoria, routerLink: 'asesoramiento/facturacion/rendicion'},

            ]
        }
    ]
  },

  {

    label: 'Mantenimiento',
    items: [{
            label: 'Parametros',
            visible: !this.administracion_produccion,
            items: [
              {label: 'Producto', routerLink: 'mantenimiento/articulo'},
              {label: 'Insumo', routerLink: 'mantenimiento/insumo'},
              {label: 'Armado de producto', routerLink: 'mantenimiento/articulo/confeccion'},
              {label: 'Unidad', routerLink: 'mantenimiento/unidad'},
              {label: 'Grupo de insumos', routerLink: 'mantenimiento/grupo/analisis'},
              {label: 'Grupos', routerLink: 'mantenimiento/grupo'},
              {label: 'Lineas de producción', routerLink: 'mantenimiento/lineas/produccion'}
            ]
        },
        {
            label: 'Calidad',
            visible: !this.administarcion_auditoria,
            items: [
              {label: 'Encabezado', routerLink: 'mantenimiento/calidad/encabezado'},
              {label: 'Parametros', routerLink: 'mantenimiento/calidad/parametro'},
              {label: 'Confección de planilla', routerLink: 'mantenimiento/calidad/encabezado/parametro'}
          ]
      },
      {
       label: 'Usuario',
       visible: !this.mantenimiento,
      routerLink: 'usuario'},
    ]
  }

];


}

configurarUsuario( ) {
}

}






