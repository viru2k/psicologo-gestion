import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAsociarProduccionDetalleComponent } from './popup-asociar-produccion-detalle.component';

describe('PopupAsociarProduccionDetalleComponent', () => {
  let component: PopupAsociarProduccionDetalleComponent;
  let fixture: ComponentFixture<PopupAsociarProduccionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAsociarProduccionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAsociarProduccionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
