import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarProduccionDetalleComponent } from './asociar-produccion-detalle.component';

describe('AsociarProduccionDetalleComponent', () => {
  let component: AsociarProduccionDetalleComponent;
  let fixture: ComponentFixture<AsociarProduccionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarProduccionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarProduccionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
