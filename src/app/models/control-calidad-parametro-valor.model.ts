export class ControCalidadParametroValor {


    private id:string;
    private calidad_control_parametro_id: string;
    private calidad_valor: number;
    private usuario_modifica_id: string;
    private observaes_no_conformidadcion: string;
    private tiene_accion_correctiva: string;
    private es_no_conformidad_descripcion: string;
    private tiene_accion_correctiva_descripcion: string;
    private fecha_carga: string;
    private produccion_proceso_id: string;

   
     constructor(
        id: string,
        calidad_control_parametro_id: string,
        calidad_valor: number,
        usuario_modifica_id: string,
        observaes_no_conformidadcion: string,
        tiene_accion_correctiva: string,
        es_no_conformidad_descripcion: string,
        tiene_accion_correctiva_descripcion: string,
        fecha_carga: string,
        produccion_proceso_id: string
    ) {
        this.id = id;
        this.calidad_control_parametro_id = calidad_control_parametro_id;
        this.calidad_valor = calidad_valor;
        this.usuario_modifica_id = usuario_modifica_id;
        this.observaes_no_conformidadcion = observaes_no_conformidadcion;
        this.tiene_accion_correctiva = tiene_accion_correctiva;
        this.es_no_conformidad_descripcion = es_no_conformidad_descripcion;
        this.tiene_accion_correctiva_descripcion = tiene_accion_correctiva_descripcion;
        this.fecha_carga = fecha_carga;
        this.produccion_proceso_id = produccion_proceso_id;

    } 

}
