import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/api';

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

  constructor(public config: DynamicDialogConfig) { }

  ngOnInit() {
    console.log(this.config.data);
    
    this._pallet_calculo = this.config.data['pack'] * this.config.data['pisos'] * this.config.data['botellas'];
    this._piso = this.config.data['pack'] *  this.config.data['botellas'];    
    this._pack =  this.config.data['botellas'];    
    this._botella = 1;
    
  }

  calcular(){
    this.pallet_calculo = (this.pallet * this._pallet_calculo) + (this.piso * this._piso) + (this.pack * this._pack) + (this.botella * this._botella);
  }

}
