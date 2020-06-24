export class StockMovimiento {


    private id:string;
    private insumo_id:string;
    private cantidad:number;
    private cantidad_usada: number;
    private cantidad_existente: number;
    private importe_acumulado: number;
    private importe_unitario: number;
    private importe_total: number;
    private usuario_modifica_id: string;
    private fecha_ingreso: string;
    private fecha_movimiento: string;
    private estado: string;

    constructor(
        id:string,
        insumo_id:string,
        cantidad:number,
        cantidad_usada: number,
        cantidad_existente: number,
        importe_acumulado: number,
        importe_unitario: number,
        importe_total: number,
        usuario_modifica_id: string,
        fecha_ingreso: string,
        fecha_movimiento: string,
        estado: string,
    ) {

        this.id = id;
        this.insumo_id = insumo_id;
        this.cantidad = cantidad;
        this.cantidad_usada = cantidad_usada;
        this.cantidad_existente = cantidad_existente;
        this.importe_acumulado = importe_acumulado;
        this.importe_unitario = importe_unitario;
        this.importe_total = importe_total;
        this.usuario_modifica_id = usuario_modifica_id;
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_movimiento = fecha_movimiento;
        this.estado = estado;

    }

}
