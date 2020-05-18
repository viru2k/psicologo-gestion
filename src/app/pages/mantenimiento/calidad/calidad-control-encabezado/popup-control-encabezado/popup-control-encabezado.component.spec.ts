import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlEncabezadoComponent } from './popup-control-encabezado.component';

describe('PopupControlEncabezadoComponent', () => {
  let component: PopupControlEncabezadoComponent;
  let fixture: ComponentFixture<PopupControlEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupControlEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
