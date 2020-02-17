import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import { AutofocusModule } from 'angular-autofocus-fix'; 
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

/** COMPONENTES **/
import { AppComponent } from './app.component';


/** DIRECTIVAS **/



import { ROUTES } from './app.routes';
import { NgxPopper } from 'angular-popper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MultiSelectModule } from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {SpinnerModule} from 'primeng/spinner';
import {ToastModule} from 'primeng/toast';
import { DynamicDialogModule } from "primeng/dynamicdialog";
import {ListboxModule} from 'primeng/listbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenuItem, MessageService,DialogService,SelectItem} from 'primeng/api';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { registerLocaleData,LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';


import { AutorizacionesComponent } from './pages/psicolog/autorizaciones/autorizaciones.component';
import { CursosComponent } from './pages/psicolog/cursos/cursos.component';
import { LiquidacionComponent } from './pages/psicolog/liquidacion/liquidacion.component';
import { MiCuentaComponent } from './pages/psicolog/mi-cuenta/mi-cuenta.component';
import { PopupLiquidacionDetalleComponent } from './shared/components/popup/popup-liquidacion-detalle/popup-liquidacion-detalle.component';
import localeEsAR from '@angular/common/locales/es-AR';
import { InicioGestionComponent } from './pages/psicolog/inicio-gestion/inicio-gestion.component';
import { AsuntosprofesionalesComponent } from './pages/psicolog/secretaria/asuntosprofesionales/asuntosprofesionales.component';
import { SocialComponent } from './pages/psicolog/secretaria/social/social.component';
import { TesoreriaComponent } from './pages/psicolog/tesoreria/tesoreria.component';
import { RevisoresComponent } from './pages/psicolog/revisores/revisores.component';
import { AutogestionComponent } from './pages/psicolog/autogestion/autogestion.component';
import { SecretariageneralComponent } from './pages/psicolog/secretariageneral/secretariageneral.component';


registerLocaleData(localeEsAR, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    EmptyComponent,
    NotFoundComponent,
  
  
    AutorizacionesComponent,
    CursosComponent,
    LiquidacionComponent,
    MiCuentaComponent,
    PopupLiquidacionDetalleComponent,
    InicioGestionComponent,
    AsuntosprofesionalesComponent,
    SocialComponent,
    TesoreriaComponent,
    RevisoresComponent,
    AutogestionComponent,
    SecretariageneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    BrowserModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    TableModule,
    CardModule,
    DropdownModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    InputMaskModule,
    MenubarModule,
    MenuModule,
    CheckboxModule,
    SpinnerModule,
    ToastModule,
    ListboxModule,
    OverlayPanelModule,
    DynamicDialogModule,
    OrderListModule,
    InputTextareaModule,
    ScrollPanelModule,
    NgxPopper,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot( ROUTES, { useHash: true } ),
  ],
  entryComponents: [ 
    PopupLiquidacionDetalleComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' },{
    provide: HTTP_INTERCEPTORS,
    useFactory: function(injector: Injector) {
        return new JwtInterceptor(injector);
    },
    multi: true,
    deps: [Injector]
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

