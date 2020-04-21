export class OrdenProduccionDetalle {


    private id:string;
    private articulo_id:string;
    private fecha_produccion: Date;
    private cantidad_solicitada: number;
    private cantidad_usada: number;
    private cantidad_existente: number;
    private usuario_modifica_id: string;


    constructor(
         id: string,
         articulo_id: string,
         fecha_produccion: Date,
         cantidad_solicitada: number,
         cantidad_usada: number,
         cantidad_existente: number,
         usuario_modifica_id: string
    ) {}

}
