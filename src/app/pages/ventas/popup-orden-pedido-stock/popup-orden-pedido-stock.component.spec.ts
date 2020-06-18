import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrdenPedidoStockComponent } from './popup-orden-pedido-stock.component';

describe('PopupOrdenPedidoStockComponent', () => {
  let component: PopupOrdenPedidoStockComponent;
  let fixture: ComponentFixture<PopupOrdenPedidoStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOrdenPedidoStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOrdenPedidoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
