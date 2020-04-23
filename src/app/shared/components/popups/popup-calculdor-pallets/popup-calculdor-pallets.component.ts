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
  botella:number = 0;
  botella_calculo:number = 0;
  litros:number= 0;
  litros_calculo:number= 0;

  _pallet:number  = 0;
  _pallet_calculo:number;
  _pack:number;
  _pack_calculo:number;
  _piso:number;
  _piso_calculo:number;
  _botella:number;
  _botella_calculo:number;
  _litros:number;
  _litros_calculo:number;
  calculos:any[] = [];

  constructor(public config: DynamicDialogConfig,  public ref: DynamicDialogRef) { }

  ngOnInit() {
    console.log(this.config.data);
    
    this._pallet_calculo = this.config.data['pallet_pack'] * this.config.data['pallet_pisos'] * this.config.data['unidades'];
    this._piso = this.config.data.pallet_pack *  this.config.data.unidades;
    this._pack =  this.config.data['unidades'];
    this._botella = 1;
    console.log(this._piso);
    
  }

  calcular(){
    this.pallet_calculo = (this.pallet * this._pallet_calculo) + (this.piso * this._piso) + (this.pack * this._pack) + (this.botella * this._botella);
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
