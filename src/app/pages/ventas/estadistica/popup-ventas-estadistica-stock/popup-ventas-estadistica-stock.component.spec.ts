import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVentasEstadisticaStockComponent } from './popup-ventas-estadistica-stock.component';

describe('PopupVentasEstadisticaStockComponent', () => {
  let component: PopupVentasEstadisticaStockComponent;
  let fixture: ComponentFixture<PopupVentasEstadisticaStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupVentasEstadisticaStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVentasEstadisticaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
