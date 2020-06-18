import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrdenPedidoDetalleComponent } from './popup-orden-pedido-detalle.component';

describe('PopupOrdenPedidoDetalleComponent', () => {
  let component: PopupOrdenPedidoDetalleComponent;
  let fixture: ComponentFixture<PopupOrdenPedidoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOrdenPedidoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOrdenPedidoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
