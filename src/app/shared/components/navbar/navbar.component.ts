
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
             if($(this).val().trim() != "") {
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
             if(validate(input[i]) == false){
                 showValidate(input[i]);
                 check=false;
             }
         }
 
         return check;
     });
 
 
     $('.validate-form .input100').each(function(){
         $(this).focus(function(){
            hideValidate(this);
         });
     });
 
     function validate (input) {
         if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
             if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                 return false;
             }
         }
         else {
             if($(input).val().trim() == ''){
                 return false;
             }
         }
     }
 
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
  this.throwAlert('error','Usuario o contraseña incorrectos',  'Verifique el usuario y contraseña, su sesion puede haber expirado','500');
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
            let us = new User("","","","","",this.f.username.value,this.f.password.value,[],this.f.puesto.value);
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
       this.elemento[0]['name'],'1',this.elemento[0]['email'], currentUser['access_token'],this.elementoModulo, this.f.puesto.value);
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


menuList(){

  this.general = [

    {

      label: 'Producción',
      visible: !this.gestion_produccion,
      items: [
        {label: 'Orden de producción', visible: !this.gestion_produccion, routerLink: '/produccion/orden'},
        {
            label: 'Producción',
            visible: !this.administracion_produccion,
            items: [
              {label: 'Proceso de producción', routerLink: 'orden/produccion/ingreso'},
              {label: 'Estado orden de producción', routerLink: '/produccion/orden/estado'},
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
    visible:!this.gestion_auditoria,
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
              {label: 'Sector', routerLink: 'mantenimiento/sector'},
            ]
        },
        {
            label: 'Calidad',
            visible:! this.administarcion_auditoria,
            items: [
              {label: 'Encabezado de planilla', routerLink: 'calidad/encabezado'},
              {label: 'Datos de planilla', routerLink: 'calidad/planilla'},
              {label: 'Datos de columnas', routerLink: 'calidad/columnas'}
          ]
      },
      {
       label: 'Usuario',
       visible:! this.mantenimiento,
      routerLink: 'usuario'},
 

    ]
  }
   
 
];


}

throwAlert(estado:string, mensaje:string, motivo:string, errorNumero:string){
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

  if(errorNumero =='99'){
  mensaje ='Debe seleccionar un paciente antes de cargar las prácticas';
  swal({   
      type: 'warning',
      title: 'Atención..',
      text: mensaje,
      footer: motivo
    })
}

  if(errorNumero =='100'){
  mensaje ='El paciente posee una obra social que no esta habilitada';
  swal({   
      type: 'warning',
      title: 'Atención..',
      text: mensaje,
      footer: motivo
    })
}
  if(estado == 'warning'){
    
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






