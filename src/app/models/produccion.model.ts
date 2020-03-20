export class Produccion {

    id:string;
    orden_produccion_articulos_id:string;
    articulo_id:string;
    fecha_produccion:string;
    unidad_id:string;
    cantidad_botella:number;
    cantidad_litros:number;
    sector_id:string;
    usuario_alta_id:string;
    usuario_modifica_id:String;
   

    constructor( 
        id:string,
        orden_produccion_articulos_id:string,
        articulo_id:string,
        fecha_produccion:string,
        unidad_id:string,
        cantidad_botella:number,
        cantidad_litros:number,
        sector_id:string,
        usuario_alta_id:string,
        usuario_modifica_id:String
    ){
        this.id = id;
        this.orden_produccion_articulos_id = orden_produccion_articulos_id;
        this.articulo_id = articulo_id;
        this.fecha_produccion = fecha_produccion;
        this.unidad_id = unidad_id;
        this.cantidad_botella = cantidad_botella;
        this.cantidad_litros = cantidad_litros;
        this.sector_id = sector_id;
        this.usuario_alta_id = usuario_alta_id;
        this.usuario_modifica_id = usuario_modifica_id;
    }
}