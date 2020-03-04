import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector,LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, LocationStrategy, HashLocationStrategy, CurrencyPipe, DecimalPipe } from '@angular/common';
import { HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';

/* -------------------------------------------------------------------------- */
/*                                  SERVICIOS                                 */
/* -------------------------------------------------------------------------- */

import { ExcelService } from './services/excel.service';
import { PushNotificationService } from './services/push-notification.service';

/* -------------------------------------------------------------------------- */
/*                             PRIME NG LIBRERIAS                             */
/* -------------------------------------------------------------------------- */

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
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogModule } from "primeng/dynamicdialog";
import {ListboxModule} from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenuItem, MessageService,DialogService,SelectItem} from 'primeng/api';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule} from 'primeng/autocomplete';





/* -------------------------------------------------------------------------- */
/*                            LIBRERIAS DE TERCEROS                           */
/* -------------------------------------------------------------------------- */

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AutofocusModule } from 'angular-autofocus-fix'; 
import localeEsAR from '@angular/common/locales/es-AR';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTES                                */
/* -------------------------------------------------------------------------- */

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';

/* -------------------------------------------------------------------------- */
/*                                 DIRECTIVAS                                 */
/* -------------------------------------------------------------------------- */



import { NgxPopper } from 'angular-popper';
import { ProduccionindicadoresComponent } from './pages/produccion/produccionindicadores/produccionindicadores.component';
import { CalidadindicadoresComponent } from './pages/calidad/calidadindicadores/calidadindicadores.component';
import { ArticuloComponent } from './pages/mantenimiento/articulo/articulo.component';
import { ArticuloEditarComponent } from './pages/mantenimiento/articulo-editar/articulo-editar.component';
import { ArticuloConfeccionEditarComponent } from './pages/mantenimiento/articulo-confeccion-editar/articulo-confeccion-editar.component';
import { ArticuloConfeccionComponent } from './pages/mantenimiento/articulo-confeccion/articulo-confeccion.component';
import { InsumoComponent } from './pages/mantenimiento/insumo/insumo.component';
import { InsumoEditarComponent } from './pages/mantenimiento/insumo-editar/insumo-editar.component';
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';
import { UsuarioEditarComponent } from './pages/mantenimiento/usuario-editar/usuario-editar.component';
import { UnidadComponent } from './pages/mantenimiento/unidad/unidad.component';
import { UnidadEditarComponent } from './pages/mantenimiento/unidad-editar/unidad-editar.component';
import { CalidadControlComponent } from './pages/mantenimiento/calidad/calidad-control/calidad-control.component';
import { CalidadControlEditarComponent } from './pages/mantenimiento/calidad/calidad-control/calidad-control-editar/calidad-control-editar.component';
import { CalidadDatoRelevadoComponent } from './pages/mantenimiento/calidad/calidad-dato-relevado/calidad-dato-relevado.component';
import { CalidadDatoRelevadoEditarComponent } from './pages/mantenimiento/calidad/calidad-dato-relevado/calidad-dato-relevado-editar/calidad-dato-relevado-editar.component';
import { CalidadTipoControlComponent } from './pages/mantenimiento/calidad/calidad-tipo-control/calidad-tipo-control.component';
import { CalidadTipoControlEditarComponent } from './pages/mantenimiento/calidad/calidad-tipo-control/calidad-tipo-control-editar/calidad-tipo-control-editar.component';
import { CustomPreloaderComponent } from './shared/components/custom-preloader/custom-preloader.component';
import { PopupArticuloConsultaComponent } from './shared/components/popups/popup-articulo-consulta/popup-articulo-consulta.component';
import { PopupInsumoConsultaComponent } from './shared/components/popups/popup-insumo-consulta/popup-insumo-consulta.component';
import { PopupArticuloDistribucionConsultaComponent } from './shared/components/popups/popup-articulo-distribucion-consulta/popup-articulo-distribucion-consulta.component';
import { PopupUsuarioComponent } from './shared/components/popups/popup-usuario/popup-usuario.component';

@NgModule({
  declarations: [
    AppComponent,   
    DateFormatPipe, 
    NavbarComponent,
    EmptyComponent,
    NotFoundComponent,    
    ProduccionindicadoresComponent,
    CalidadindicadoresComponent,
    ArticuloComponent,
    ArticuloEditarComponent,
    ArticuloConfeccionEditarComponent,
    ArticuloConfeccionComponent,
    InsumoComponent,
    InsumoEditarComponent,
    UsuarioComponent,
    UsuarioEditarComponent,
    UnidadComponent,
    UnidadEditarComponent,
    CalidadControlComponent,
    CalidadControlEditarComponent,
    CalidadDatoRelevadoComponent,
    CalidadDatoRelevadoEditarComponent,
    CalidadTipoControlComponent,
    CalidadTipoControlEditarComponent,
    CustomPreloaderComponent,
    PopupArticuloConsultaComponent,
    PopupInsumoConsultaComponent,
    PopupArticuloDistribucionConsultaComponent,
    PopupUsuarioComponent
  ],
  imports: [


  
    
    BrowserModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    TableModule,
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
    ProgressSpinnerModule,
    PanelModule,
    AutoCompleteModule,
    PivotViewModule ,
    SweetAlert2Module.forRoot(),
    AutofocusModule,
    NgxPopper,
    AppRoutingModule 
    
  ],
  entryComponents: [ArticuloEditarComponent,
     ArticuloConfeccionEditarComponent,
     CalidadTipoControlEditarComponent,
     InsumoEditarComponent,
     UsuarioEditarComponent,
     UnidadEditarComponent,

/* -------------------------------------------------------------------------- */
/*                             POPUPS COMPARTIDOS                             */
/* -------------------------------------------------------------------------- */
    PopupArticuloConsultaComponent,
    PopupInsumoConsultaComponent,
    PopupArticuloDistribucionConsultaComponent,
    PopupUsuarioComponent
    ],
  providers: [CurrencyPipe,DecimalPipe,
    PushNotificationService,ExcelService,{ provide: LOCALE_ID, useValue: 'es-Ar' },
 {
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


//08103330303