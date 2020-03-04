import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadDatoRelevadoComponent } from './calidad-dato-relevado.component';

describe('CalidadDatoRelevadoComponent', () => {
  let component: CalidadDatoRelevadoComponent;
  let fixture: ComponentFixture<CalidadDatoRelevadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadDatoRelevadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadDatoRelevadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
