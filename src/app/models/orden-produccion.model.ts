import { OrdenProduccionDetalle } from './orden-produccion-detalle.model';

export class OrdenProduccion {


    private id:string;
    private fecha_creacion: string;
    private usuario_modifica_id: string;
    private descripcion: string;
    private observacion: string;
    private OrdenProduccionDetalle: OrdenProduccionDetalle[];
    private fecha_desde: string;
    private fecha_hasta: string;

    constructor(
    id: string,
    fecha_creacion: string,
    usuario_modifica_id: string,
    descripcion: string,
    observacion: string,
    OrdenProduccionDetalle: OrdenProduccionDetalle[],
    fecha_desde: string,
    fecha_hasta: string){
        this.id = id;
        this.fecha_creacion = fecha_creacion;
        this.usuario_modifica_id = usuario_modifica_id;
        this.descripcion = descripcion;
        this.observacion = observacion;
        this.OrdenProduccionDetalle = OrdenProduccionDetalle;
        this.fecha_desde = fecha_desde;
        this.fecha_hasta = fecha_hasta;

    }

}
