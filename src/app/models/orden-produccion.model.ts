import { OrdenProduccionDetalle } from './orden-produccion-detalle.model';

export class OrdenProduccion {


    private id:string;
    private fecha_creacion: Date;
    private usuario_modifica_id: string;
    private descripcion: string;
    private observacion: string;
    private OrdenProduccionDetalle: [];


    constructor(
    id: string,
    fecha_creacion: Date,
    usuario_modifica_id: string,
    descripcion: string,
    observacion: string,
    OrdenProduccionDetalle: []){}

}
