export class OrdenProduccionDetalle {


    private id:string;
    private orden_produccion_id:string;
    private articulo_id:string;
    private fecha_produccion: string;
    private cantidad_solicitada: number;
    private cantidad_usada: number;
    private cantidad_existente: number;
    private usuario_modifica_id: string;
    private orden_produccion_detall_estado: string;

    constructor(
         id: string,
         articulo_id: string,
         orden_produccion_id:string,
         fecha_produccion: string,
         cantidad_solicitada: number,
         cantidad_usada: number,
         cantidad_existente: number,
         usuario_modifica_id: string,
         orden_produccion_detall_estado: string
    ) {}

}
