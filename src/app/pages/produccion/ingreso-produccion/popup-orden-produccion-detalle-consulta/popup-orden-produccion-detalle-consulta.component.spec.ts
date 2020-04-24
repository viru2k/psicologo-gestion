import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrdenProduccionDetalleConsultaComponent } from './popup-orden-produccion-detalle-consulta.component';

describe('PopupOrdenProduccionDetalleConsultaComponent', () => {
  let component: PopupOrdenProduccionDetalleConsultaComponent;
  let fixture: ComponentFixture<PopupOrdenProduccionDetalleConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOrdenProduccionDetalleConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOrdenProduccionDetalleConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
