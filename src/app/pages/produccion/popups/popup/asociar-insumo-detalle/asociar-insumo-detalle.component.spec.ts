import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarInsumoDetalleComponent } from './asociar-insumo-detalle.component';

describe('AsociarInsumoDetalleComponent', () => {
  let component: AsociarInsumoDetalleComponent;
  let fixture: ComponentFixture<AsociarInsumoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarInsumoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarInsumoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
