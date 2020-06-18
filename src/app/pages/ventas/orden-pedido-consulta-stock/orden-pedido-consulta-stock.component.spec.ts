import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidoConsultaStockComponent } from './orden-pedido-consulta-stock.component';

describe('OrdenPedidoConsultaStockComponent', () => {
  let component: OrdenPedidoConsultaStockComponent;
  let fixture: ComponentFixture<OrdenPedidoConsultaStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenPedidoConsultaStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenPedidoConsultaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
