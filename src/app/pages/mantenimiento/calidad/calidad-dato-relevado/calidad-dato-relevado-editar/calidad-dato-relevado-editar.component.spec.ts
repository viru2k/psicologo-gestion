import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadDatoRelevadoEditarComponent } from './calidad-dato-relevado-editar.component';

describe('CalidadDatoRelevadoEditarComponent', () => {
  let component: CalidadDatoRelevadoEditarComponent;
  let fixture: ComponentFixture<CalidadDatoRelevadoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadDatoRelevadoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadDatoRelevadoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
