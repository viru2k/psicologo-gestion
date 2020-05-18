import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadConsultaProduccionComponent } from './calidad-consulta-produccion.component';

describe('CalidadConsultaProduccionComponent', () => {
  let component: CalidadConsultaProduccionComponent;
  let fixture: ComponentFixture<CalidadConsultaProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadConsultaProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadConsultaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
