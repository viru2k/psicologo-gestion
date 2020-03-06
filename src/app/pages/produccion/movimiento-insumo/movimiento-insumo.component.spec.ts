import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoInsumoComponent } from './movimiento-insumo.component';

describe('MovimientoInsumoComponent', () => {
  let component: MovimientoInsumoComponent;
  let fixture: ComponentFixture<MovimientoInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoInsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
