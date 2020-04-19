import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFacturaDetalleComponent } from './popup-factura-detalle.component';

describe('PopupFacturaDetalleComponent', () => {
  let component: PopupFacturaDetalleComponent;
  let fixture: ComponentFixture<PopupFacturaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFacturaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFacturaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
