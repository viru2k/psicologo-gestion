import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadConsultaLineaComponent } from './calidad-consulta-linea.component';

describe('CalidadConsultaLineaComponent', () => {
  let component: CalidadConsultaLineaComponent;
  let fixture: ComponentFixture<CalidadConsultaLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadConsultaLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadConsultaLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
