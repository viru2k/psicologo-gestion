import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilInsumoDetalleComponent } from './mobil-insumo-detalle.component';

describe('MobilInsumoDetalleComponent', () => {
  let component: MobilInsumoDetalleComponent;
  let fixture: ComponentFixture<MobilInsumoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilInsumoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilInsumoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
