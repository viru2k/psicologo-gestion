import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadControlEncabezadoParametroComponent } from './calidad-control-encabezado-parametro.component';

describe('CalidadControlEncabezadoParametroComponent', () => {
  let component: CalidadControlEncabezadoParametroComponent;
  let fixture: ComponentFixture<CalidadControlEncabezadoParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadControlEncabezadoParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadControlEncabezadoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
