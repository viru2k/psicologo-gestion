export class OrdenPedido {

    id:string;
    fecha_pedido:string;
    usuario_id:string;
    articulo:any[];
   

    constructor( 
        id:string,
        fecha_pedido:string,
        usuario_id:string,
        articulo:any[]
    ){
        this.id = id;
        this.fecha_pedido = fecha_pedido;
        this.usuario_id = usuario_id;
        this.articulo = articulo;
    }
}