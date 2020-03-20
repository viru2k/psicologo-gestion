export class OrdenProduccion {

    id:string;
    fecha_produccion:string;
    usuario_id:string;
    articulo:any[];
   

    constructor( 
        id:string,
        fecha_produccion:string,
        usuario_id:string,
        articulo:any[]
    ){
        this.id = id;
        this.fecha_produccion = fecha_produccion;
        this.usuario_id = usuario_id;
        this.articulo = articulo;
    }
}