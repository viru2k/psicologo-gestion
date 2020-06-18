import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilInsumoMovimientoComponent } from './mobil-insumo-movimiento.component';

describe('MobilInsumoMovimientoComponent', () => {
  let component: MobilInsumoMovimientoComponent;
  let fixture: ComponentFixture<MobilInsumoMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilInsumoMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilInsumoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
