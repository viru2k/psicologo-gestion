import { Component, OnInit } from '@angular/core';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { DataManager, WebApiAdaptor  } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-produccionindicadores',
  templateUrl: './produccionindicadores.component.html',
  styleUrls: ['./produccionindicadores.component.scss']
})
export class ProduccionindicadoresComponent implements OnInit {


  public pivotData: IDataSet[];
  public dataSourceSettings: IDataOptions;
  //
  public data: DataManager;
  public dataSource: IDataOptions;
  public width: string;
 
  ngOnInit() {

    this.data = new DataManager({
      url: 'https://bi.syncfusion.com/northwindservice/api/orders',
      adaptor: new WebApiAdaptor,
      crossDomain: true
  });

  console.log(this.data);
 
    this.dataSource = {
      //data: this.data,
      expandAll: false,
      rows: [{ name: 'ProductName', caption: 'Product Name' }],
      columns: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
      formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
      values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
      filters: []    
};
    this.width = '800';
  }
}