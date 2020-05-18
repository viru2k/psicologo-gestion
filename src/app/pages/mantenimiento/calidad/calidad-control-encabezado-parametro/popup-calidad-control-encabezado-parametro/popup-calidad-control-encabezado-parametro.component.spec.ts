import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCalidadControlEncabezadoParametroComponent } from './popup-calidad-control-encabezado-parametro.component';

describe('PopupCalidadControlEncabezadoParametroComponent', () => {
  let component: PopupCalidadControlEncabezadoParametroComponent;
  let fixture: ComponentFixture<PopupCalidadControlEncabezadoParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCalidadControlEncabezadoParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCalidadControlEncabezadoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
