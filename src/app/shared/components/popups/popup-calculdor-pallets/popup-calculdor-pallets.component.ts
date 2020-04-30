import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-popup-calculdor-pallets',
  templateUrl: './popup-calculdor-pallets.component.html',
  styleUrls: ['./popup-calculdor-pallets.component.scss']
})
export class PopupCalculdorPalletsComponent implements OnInit {

  pallet:number  = 0;
  pallet_calculo:number = 0;
  pack:number = 0;
  pack_calculo:number = 0;
  piso:number = 0;
  piso_calculo:number = 0;
  unidad:number = 0;
  unidad_calculo:number = 0;
  litros:number= 0;
  litros_calculo:number= 0;

  _pallet:number  = 0;
  _pallet_calculo:number;
  _pack:number;
  _pack_calculo:number;
  _piso:number;
  _piso_calculo:number;
  _unidad:number;
  _unidad_calculo:number;
  _litros:number;
  _litros_calculo:number;
  calculos:any[] = [];

  constructor(public config: DynamicDialogConfig,  public ref: DynamicDialogRef) { }

  ngOnInit() {
    console.log(this.config.data);
    if (this.config.data) {
      if (this.config.data.a_calcular) {
     
        this._pallet_calculo = Number(this.config.data.a_calcular);
        console.log(this._pallet_calculo );
        console.log(this.config.data.pallet_pisos);
        // tslint:disable-next-line: max-line-length
        this._pallet = (((this._pallet_calculo / this.config.data.pallet_pisos) / this.config.data.pallet_pack) / this.config.data.unidades) ;
        this._pack = (this._pallet_calculo / this.config.data.pallet_pack  );
      //  this._piso =   this.config.data.pallet_pisos / this._pallet;
        this.pallet = this._pallet;
        this.pack = this._pack;
        this.pallet_calculo = this.config.data.a_calcular;
      }else{
        this._pallet_calculo = this.config.data['pallet_pack'] * this.config.data['pallet_pisos'] * this.config.data['unidades'];
        this._piso = this.config.data.pallet_pack *  this.config.data.unidades;
        this._pack =  this.config.data['unidades'];
      }

    }
    

  }

  calcular(){
    this._pallet_calculo = this.config.data['pallet_pack'] * this.config.data['pallet_pisos'] * this.config.data['unidades'];
    this.pallet_calculo =  (this.pallet * this._pallet_calculo) * (this.piso * this.config.data.pallet_pisos) + (this.pack * this.config.data.pallet_pack) + (this.unidad * this.config.data.unidades);
    this.litros_calculo = this.pallet_calculo * Number(this.config.data['volumen']);
  }

  guardarCalculo(){
    if (this.pallet_calculo> 0){
      this.calculos.push({'unidades' : this.pallet_calculo},{'volumen' : this.litros_calculo});
      console.log(this.calculos);
      this.ref.close(this.calculos);
    }
  }

}
