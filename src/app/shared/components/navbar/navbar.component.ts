
import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';

import { DialogService } from 'primeng/components/common/api';
import { DatePipe } from '@angular/common';
import { AlertServiceService } from './../../../services/alert-service.service';


//'@types/chart.js': '^2.7.40',
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [MessageService,DialogService,DatePipe]
})
export class NavbarComponent implements OnInit {
  
  user:User;
  loggedIn:boolean = false;
  general: MenuItem[];
  mantenimiento:boolean =true;
  gestion_auditoria:boolean =true;
  administarcion_auditoria:boolean =true;
  gestion_produccion:boolean =true;
  administracion_produccion:boolean =true;
  gestion_stock:boolean =true;
  administracion_stock:boolean =true;
  

  public username:string;
  public puesto:string;
  elemento:User = null;
  elementoModulo:[] = null;
  loginForm: FormGroup;
  loading = false;
  loading_mensaje:string;
  loading_error:boolean;
  submitted = false;
  returnUrl: string;
  error = '';
  notificaciones:number= 0;
  chats:boolean;

  constructor(
    private alertServiceService: AlertServiceService,
    public dialogService: DialogService, 
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private miServico:UserService) { 

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
     $('.input100').each(function(){
         $(this).on('blur', function(){
             if($(this).val() !== "") {
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
 
     $('.validate-form').on('submit',function(){
         var check = true;
 
         for(var i=0; i<input.length; i++) {
          
         }
 
         return check;
     });
 
 
     $('.validate-form .input100').each(function(){
         $(this).focus(function(){
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
      password: ['', Validators.required],
      puesto: ['0']
  });

   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
   
   if(currentUser['access_token'] != ''){
  let userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  console.log('usuario logueado');
  this.loggedIn = true;
  this.username = userData['username'];
  this.puesto = userData['puesto'];
  console.log(userData['access_list']);
  this.asignarModulos(userData['access_list']);
   //  this.getNotificacionesByUsuario();
     /*** busco notificaciones si esta logueado*/
    /* let timer = Observable.timer(180000,180000);//180000 -- 3 minutos inicia y en 3 minutos vuelve a llamar
     timer.subscribe(t=> {
       console.log('listando notificaciones');
       this.getNotificacionesByUsuario();
   });*/
  this.menuList();
}else{
  console.log("sin credenciales");
  this.alertServiceService.throwAlert('error','Usuario o contraseña incorrectos',  'Verifique el usuario y contraseña, su sesion puede haber expirado','500');
}
 
   
}

accion(evt:any,overlaypanel:OverlayPanel){
  if(event){
    
  }
  console.log(event);

  overlaypanel.toggle(evt);
}

ajustes(){
  console.log('ajustes');
}

asignarModulos(modulos: any){
  modulos.forEach(element => {
   // console.log(element['modulo_nombre']);
    if(element['modulo_nombre'] === 'mantenimiento'){
      this.mantenimiento = false;
    }
    if(element['modulo_nombre'] === 'gestion_auditoria'){
      this.gestion_auditoria = false;
    }
    if(element['modulo_nombre'] === 'administarcion_auditoria'){
      this.administarcion_auditoria = false;
      console.log( element['modulo_nombre']);
    }
    if(element['modulo_nombre'] === 'gestion_produccion'){
      this.gestion_produccion = false;
    }
    if(element['modulo_nombre'] === 'administracion_produccion'){
      this.administracion_produccion = false;
    }
    if(element['modulo_nombre'] === 'gestion_stock'){
      this.gestion_stock = false;
    }
    if(element['modulo_nombre'] === 'administracion_stock'){
      this.administracion_stock = false;
    }
    
  });


  /** DESPUES DE ASIGNAR MODULOS VERIFICO LAS NOTIFICACIONES */

 
}

cerrarSesion(){

  swal({
  title: 'Cerrando sesión',
  text: '¿Desea finalizar la sesión actual?',
  showCancelButton: true,
  confirmButtonColor: '#AD1457',
  cancelButtonColor: '#0277BD',
  cancelButtonText: 'Permanecer',
  confirmButtonText: 'Cerrar sesión',
  imageUrl: '../../../../../assets/icons/logout1.png',
  imageHeight: 128,
  imageWidth: 128,
}).then((result) => {
  if (result.value) {
   
  console.log('sesion terminada');
  this.authenticationService.logout();
  this.loggedIn =false;
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



    //this.router.navigateByUrl('/');
}


get f() { return this.loginForm.controls; }

onSubmit() {
   
  this.submitted = true;

  // stop here if form is invalid
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
            let us = new User('','','','','',this.f.username.value, this.f.password.value, []);
            localStorage.setItem('userData', JSON.stringify(us));
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            //  this.router.navigate([this.returnUrl]);
            this.loadUser();
          },
          error => {
            
            console.log(error);
            
            if(error === 'The user credentials were incorrect.'){
              this.loading_error = true; 
              this.loading = false;
              this.loading_mensaje = '';
            }else{
              this.loading = false;
              this.loading_mensaje = '';
            }
            this.error = error;
              
          });
}

ver(){
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser['access_token']);
}

loadUser(){

this.loading = true;
try {
  this.loading_mensaje = 'Obteniendo modulos del usuario';
  this.miServico.getItemInfoAndMenu(this.f.username.value)
    .subscribe(resp => {
    this.elemento = resp;
   // this.elementoModulo = this.elemento["access_list"]
    let currentUser =  JSON.parse(localStorage.getItem('currentUser'));
    let userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.elemento);
    this.elementoModulo = <any>this.elemento;
    this.user = new User(this.elemento[0]['id'] , this.elemento[0]['email'], this.elemento[0]['nombreyapellido'],
    this.elemento[0]['name'], this.elemento[0]['admin'],this.elemento[0]['email'], currentUser['access_token'],this.elementoModulo);
    this.username = userData['username'];
    this.puesto = userData['puesto'];
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(this.user));
    this.asignarModulos(this.elementoModulo);
     // console.log(this.user);
    this.loading = false;
    this.loading_mensaje = '';
    console.log('logueado');
    this.loggedIn = true;
    this.menuList();
    },
    error => { // error path
        console.log(error.message);
        console.log(error.status);
        localStorage.removeItem('error');
        localStorage.setItem('error', JSON.stringify(error));
        this.loading_mensaje = '';
    //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
     });
} catch (error) {
//  this.throwAlert('error','Error al cargar los registros',error);
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
          visible:!this.gestion_produccion,
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
    label: 'Auditoria',
    visible: !this.gestion_auditoria,
    items: [
      {label: 'Control de producción', routerLink: 'gestion/agenda'},
      {label: 'Control de maquina', routerLink: 'recepcion/turnos'},

      {
            label: 'Indicadores',
            items: [
              {label: 'Indicadores de producción',visible:!this.gestion_auditoria, routerLink: 'asesoramiento/operacioncobro'},
              {label: 'Indicadores de máquina',visible:!this.gestion_auditoria, routerLink: 'asesoramiento/facturacion/rendicion'},

            ]
        }
    ]
  },


  {

    label: 'Mantenimiento',
    items: [{
            label: 'Parametros',
            visible:! this.administracion_produccion,
            items: [
              {label: 'Articulo', routerLink: 'mantenimiento/articulo'},
              {label: 'Insumo', routerLink: 'mantenimiento/insumo'},
              {label: 'Armado de producto', routerLink: 'mantenimiento/articulo/confeccion'},
              {label: 'Unidad', routerLink: 'mantenimiento/unidad'},
              {label: 'Grupos', routerLink: 'mantenimiento/grupo'},
              {label: 'Maquinas', routerLink: 'mantenimiento/maquina'}
            ]
        },
        {
            label: 'Calidad',
            visible:! this.administarcion_auditoria,
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






