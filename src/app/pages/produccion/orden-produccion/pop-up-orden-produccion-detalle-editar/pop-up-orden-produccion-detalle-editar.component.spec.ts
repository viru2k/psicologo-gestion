import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOrdenProduccionDetalleEditarComponent } from './pop-up-orden-produccion-detalle-editar.component';

describe('PopUpOrdenProduccionDetalleEditarComponent', () => {
  let component: PopUpOrdenProduccionDetalleEditarComponent;
  let fixture: ComponentFixture<PopUpOrdenProduccionDetalleEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpOrdenProduccionDetalleEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpOrdenProduccionDetalleEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
