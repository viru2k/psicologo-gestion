import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVentasEstadisticaProduccionComponent } from './popup-ventas-estadistica-produccion.component';

describe('PopupVentasEstadisticaProduccionComponent', () => {
  let component: PopupVentasEstadisticaProduccionComponent;
  let fixture: ComponentFixture<PopupVentasEstadisticaProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupVentasEstadisticaProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVentasEstadisticaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
