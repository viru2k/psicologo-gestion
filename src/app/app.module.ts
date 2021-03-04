import { MiCuentaComponent } from './pages/psicolog/mi-cuenta/mi-cuenta.component';
import { CursosComponent } from './pages/psicolog/cursos/cursos.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, LocationStrategy, HashLocationStrategy, CurrencyPipe, DecimalPipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';

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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {ListboxModule} from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenuItem, MessageService, DialogService, SelectItem} from 'primeng/api';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {StepsModule} from 'primeng/steps';
import {ColorPickerModule} from 'primeng/colorpicker';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';



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

import { NotFoundComponent } from './pages/info/not-found/not-found.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';

/* -------------------------------------------------------------------------- */
/*                                 DIRECTIVAS                                 */
/* -------------------------------------------------------------------------- */



import { NgxPopper } from 'angular-popper';
registerLocaleData(localeEsAR, 'es-Ar');



import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario.component';
import { UsuarioEditarComponent } from './pages/mantenimiento/usuario-editar/usuario-editar.component';

import { UsuarioModuloComponent } from './pages/mantenimiento/usuario-modulo/usuario-modulo.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { InformacionComponent } from './pages/informacion/informacion.component';
import { AsuntosprofesionalesComponent } from './pages/secretaria/asuntosprofesionales/asuntosprofesionales.component';
import { SocialComponent } from './pages/secretaria/social/social.component';
import { GeneralComponent } from './pages/secretaria/general/general.component';
import { CientificaComponent } from './pages/secretaria/cientifica/cientifica.component';
import { TesoreriaComponent } from './pages/tesoreria/tesoreria.component';
import { RevisoresComponent } from './pages/revisores/revisores.component';
import { AutorizacionesComponent } from './pages/autorizaciones/autorizaciones.component';
import { LiquidacionesComponent } from './pages/perfil/liquidaciones/liquidaciones.component';
import { FacturacionComponent } from './pages/perfil/facturacion/facturacion.component';
import { HistoriaComponent } from './pages/perfil/orden/historia/historia.component';
import { OrdenHistoriaComponent } from './pages/perfil/orden/orden-historia/orden-historia.component';
import { OrdenCargaComponent } from './pages/perfil/orden/orden-carga/orden-carga.component';
import { NoticiasComponent } from './pages/mantenimiento/noticias/noticias.component';
import { FacturacionPsicologoComponent } from './pages/mantenimiento/facturacion-psicologo/facturacion-psicologo.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PopupAsociarFacturaComponent } from './pages/perfil/liquidaciones/popup-asociar-factura/popup-asociar-factura.component';

import { UsuarioCuentaComponent } from './pages/mantenimiento/usuario-cuenta/usuario-cuenta.component';
import { PopupLiquidacionGeneradaDetalleComponent } from './pages/perfil/liquidaciones/popup-liquidacion-detalle/popup-liquidacion-generada-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    NavbarComponent,
    NotFoundComponent,
    LoadingComponent,
    UsuarioComponent,
    UsuarioEditarComponent,
    UsuarioModuloComponent,
    LoginComponent,
    InformacionComponent,
    AsuntosprofesionalesComponent,
    SocialComponent,
    GeneralComponent,
    CientificaComponent,
    TesoreriaComponent,
    RevisoresComponent,
    AutorizacionesComponent,
    LiquidacionesComponent,
    FacturacionComponent,
    HistoriaComponent,
    OrdenHistoriaComponent,
    OrdenCargaComponent,
    NoticiasComponent,
    FacturacionPsicologoComponent,
    PopupAsociarFacturaComponent,
    PopupLiquidacionGeneradaDetalleComponent,
    UsuarioCuentaComponent,
    CursosComponent,
    MiCuentaComponent
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
    InputSwitchModule,
    PanelModule,
    SelectButtonModule,
    ColorPickerModule,
    ToggleButtonModule,
    AutoCompleteModule,
    DataViewModule,
    RatingModule,
    FileUploadModule,
    PivotViewModule ,
    SweetAlert2Module.forRoot(),
    AutofocusModule,
    NgxPopper,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  entryComponents: [
     UsuarioEditarComponent,
     PopupAsociarFacturaComponent,
     PopupLiquidacionGeneradaDetalleComponent,
/* -------------------------------------------------------------------------- */
/*                        ASOCIAR PRODUCCION Y INSUMOS                        */
/* -------------------------------------------------------------------------- */


     UsuarioModuloComponent,

    ],
  providers: [CurrencyPipe, DecimalPipe,
    PushNotificationService, ExcelService, { provide: LOCALE_ID, useValue: 'es-Ar' },
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

