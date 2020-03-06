import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoProduccionComponent } from './movimiento-produccion.component';

describe('MovimientoProduccionComponent', () => {
  let component: MovimientoProduccionComponent;
  let fixture: ComponentFixture<MovimientoProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
