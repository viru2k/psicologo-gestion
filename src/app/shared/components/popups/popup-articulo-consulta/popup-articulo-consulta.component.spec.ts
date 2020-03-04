import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArticuloConsultaComponent } from './popup-articulo-consulta.component';

describe('PopupArticuloConsultaComponent', () => {
  let component: PopupArticuloConsultaComponent;
  let fixture: ComponentFixture<PopupArticuloConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupArticuloConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupArticuloConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
