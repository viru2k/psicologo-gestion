
 
  
export const URL_SERVICIOS = 'http://localhost/api-calidad/public/api/';
export const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
export const URL_ARCHIVO = 'http://localhost/api-calidad/public/';

/***********SERVER DE PRUEBAS ********************** */
 





// REMOTO WEB

//export const URL_SERVICIOS = 'https://clinicaz.com.ar/graziani/api-calidad/public/api/'; 
//export const config: SocketIoConfig = { url: 'http://clinicaz.com.ar:4444', options: {} };
//export const URL_ARCHIVO = 'http://clinicaz.com.ar/graziani/api-calidad/public/';

export const VAPID_PUBLIC ='BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg'; // SIN USO


//export const URL_SERVICIOS = 'http://192.168.1.7/api-vision/public/api/'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

export const PARAMS = 'json=';

export const calendarioIdioma:any =  {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar' 
}
//export const URL_SERVICIOS = '/mascota-api-v1';
