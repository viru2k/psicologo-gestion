export class StockMovimiento {

    private descripcion: string;
    private id:string;
    private insumo_id:string;
    private comprobante:string;
    private lote:string;
    private fecha_vencimiento: string;
    private cantidad:number;
    private cantidad_usada: number;
    private cantidad_existente: number;
    private importe_acumulado: number;
    private importe_unitario: number;
    private importe_total: number;
    private usuario_modifica_id: string;
    private fecha_ingreso: string;
    private fecha_movimiento: string;
    private estado: string
    private nombre: string;
    private importe_dolares: number;
    private importe_total_dolares: number;
    private importe_cotizacion_dolares: number;
    private ultimo_deposito_id:string;

    constructor(
        id:string,
        insumo_id:string,
        comprobante: string,
        lote: string,
        fecha_vencimiento: string,
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
        descripcion: string,
        nombre: string,
        importe_dolares: number,
        importe_total_dolares: number,
        importe_cotizacion_dolares:number,
        ultimo_deposito_id:string
    ) {

        this.id = id;
        this.insumo_id = insumo_id;
        this.comprobante = comprobante;
        this.lote = lote;
        this.fecha_vencimiento = fecha_vencimiento;
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
        this.descripcion = descripcion;
        this.nombre = nombre;
        this.importe_dolares = importe_dolares;
        this.importe_total_dolares = importe_total_dolares;
        this.importe_cotizacion_dolares = importe_cotizacion_dolares;
        this.ultimo_deposito_id = ultimo_deposito_id;
    }

}
