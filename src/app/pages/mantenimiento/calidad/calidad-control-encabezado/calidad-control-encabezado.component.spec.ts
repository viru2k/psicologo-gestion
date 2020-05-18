import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadControlEncabezadoComponent } from './calidad-control-encabezado.component';

describe('CalidadControlEncabezadoComponent', () => {
  let component: CalidadControlEncabezadoComponent;
  let fixture: ComponentFixture<CalidadControlEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadControlEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadControlEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
