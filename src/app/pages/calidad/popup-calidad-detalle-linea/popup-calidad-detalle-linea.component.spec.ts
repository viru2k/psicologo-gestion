import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCalidadDetalleLineaComponent } from './popup-calidad-detalle-linea.component';

describe('PopupCalidadDetalleLineaComponent', () => {
  let component: PopupCalidadDetalleLineaComponent;
  let fixture: ComponentFixture<PopupCalidadDetalleLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCalidadDetalleLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCalidadDetalleLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
