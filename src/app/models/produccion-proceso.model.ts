export class ProduccionProceso {


    private id:string;
    private orden_produccion_id: string;
    private articulo_id: string;
    private cantidad_solicitada: number;
    private cantidad_usada: number;
    private cantidad_pendiente: number;
    private cantidad_producida: number;
    private usuario_modifica_id: string;
    private maquina_id: string;
    private hora_inicio: string;
    private hora_fin: string;
    private estado: string;
    private orden_produccion_detalle_id:string;
    private lote: string;

    private ProduccionProceso: [];


    constructor(
        id: string,
        orden_produccion_id: string,
        articulo_id: string,
        cantidad_solicitada: number,
        cantidad_usada: number,
        cantidad_pendiente: number,
        cantidad_producida: number,
        usuario_modifica_id: string,
        maquina_id: string,
        hora_inicio: string,
        hora_fin: string,
        estado: string,
        orden_produccion_detalle_id: string,
        lote: string
        ){
            this.id = id;
            this.orden_produccion_id = orden_produccion_id;
            this.articulo_id = articulo_id;
            this.cantidad_solicitada = cantidad_solicitada;
            this.cantidad_usada = cantidad_usada;
            this.cantidad_pendiente = cantidad_pendiente;
            this.cantidad_producida = cantidad_producida;
            this.usuario_modifica_id = usuario_modifica_id;
            this.maquina_id = maquina_id;
            this.hora_inicio = hora_inicio;
            this.hora_fin = hora_fin;
            this.estado = estado;
            this.orden_produccion_detalle_id = orden_produccion_detalle_id;
            this.lote = lote;
        }

}