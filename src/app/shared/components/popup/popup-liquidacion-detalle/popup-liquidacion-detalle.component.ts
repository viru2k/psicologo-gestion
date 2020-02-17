import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/api';
import { PsicologoService } from '../../../../services/psicologo.service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-popup-liquidacion-detalle',
  templateUrl: './popup-liquidacion-detalle.component.html',
  styleUrls: ['./popup-liquidacion-detalle.component.scss']
})
export class PopupLiquidacionDetalleComponent implements OnInit {

  cols: any[];
  loading: boolean;
  elementos: any[] = [];
  elementosObraSocial:any;
  total_facturado:number; 
  cantidad_practica:number;

  constructor(private miServico: PsicologoService, public config: DynamicDialogConfig) {


    
    this.cols = [

      { field: 'os_fecha_hasta', header: 'Fecha' , width: '10%'},
      { field: 'os_nombre', header: 'Obra social',  width: '25%' },
      { field: 'os_sesion', header: 'Sesión',  width: '15%' },
      { field: 'os_cantidad', header: 'Cantidad' , width: '8%'},
      {field: 'os_precio_sesion', header: 'Valor sesión' , width: '8%' },
      { field: 'os_precio_total', header: 'Total',  width: '8%' },      
      
     
   ];

   }

  ngOnInit() {
    console.log(this.config.data);      
    this.getLiquidacionDetalleObraSocialPagoByPsicologo(this.config.data);
  }

  
  
 detalleLiquidacion(event:any){
  let userData = JSON.parse(localStorage.getItem('userData'));
  this.loading = true;
  try {
      this.miServico.getLiquidacionByPsicologo(event)
      .subscribe(resp => {
     this.elementos = resp;
          this.loading = false;
          console.log(resp);
          this.sumarValores(resp);
        this.getLiquidacionDetalleObraSocialPagoByPsicologo(event);
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
       });    
  } catch (error) {
  this.throwAlert('error','Error al cargar los registros',error,error.status);
  }  
}

getLiquidacionDetalleObraSocialPagoByPsicologo(event){
  let userData = JSON.parse(localStorage.getItem('userData'));
  this.loading = true;
  try {
      this.miServico.getLiquidacionDetalleObraSocialPagoByPsicologo(event)
      .subscribe(resp => {
        let t = resp;
        t.forEach(element => {
          /*this.elementos = this.elementos+' '+ element['os_nombre']
          resp[i]['os_nombre'] = resp[i]['obra_social_nombre'] +' / '+resp[i]['coseguro_nombre'] ;
          resp[i]['hora'] = formatDate( element['fecha_hora'], 'HH:mm', 'en');
      //    let t = formatDate( element['fecha_cobro'], 'dd/MM/yyyy', 'en');
          
          i++;*/
        });
     this.elementos = resp;
          this.loading = false;
          console.log(resp);

      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
       });    
  } catch (error) {
  this.throwAlert('error','Error al cargar los registros',error,error.status);
  }  
}



sumarValores(vals:any){
  let i:number;
  //console.log(vals[1]['valor_facturado']);
  console.log(vals !== undefined);
  this.total_facturado = 0;  
  this.cantidad_practica = 0;
  for(i=0;i<vals.length;i++){
      this.cantidad_practica = this.cantidad_practica+ Number(vals[i]['os_cantidad']);
      this.total_facturado = this.total_facturado+ Number(vals[i]['os_precio_total']);
  }

  console.log(this.total_facturado);
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
      if(estado== 'error'){
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
      if(estado== 'alerta'){
        swal({   
            type: 'warning',
            title: 'Cuidado!',
            text: mensaje,
            footer: motivo
          })
    }
    }
}

