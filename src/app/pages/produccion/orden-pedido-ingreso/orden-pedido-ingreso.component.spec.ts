import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidoIngresoComponent } from './orden-pedido-ingreso.component';

describe('OrdenPedidoIngresoComponent', () => {
  let component: OrdenPedidoIngresoComponent;
  let fixture: ComponentFixture<OrdenPedidoIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenPedidoIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenPedidoIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
