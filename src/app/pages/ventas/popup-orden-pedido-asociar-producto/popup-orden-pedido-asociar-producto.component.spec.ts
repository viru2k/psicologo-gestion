import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrdenPedidoAsociarProductoComponent } from './popup-orden-pedido-asociar-producto.component';

describe('PopupOrdenPedidoAsociarProductoComponent', () => {
  let component: PopupOrdenPedidoAsociarProductoComponent;
  let fixture: ComponentFixture<PopupOrdenPedidoAsociarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOrdenPedidoAsociarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOrdenPedidoAsociarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
