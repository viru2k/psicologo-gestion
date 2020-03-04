import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArticuloDistribucionConsultaComponent } from './popup-articulo-distribucion-consulta.component';

describe('PopupArticuloDistribucionConsultaComponent', () => {
  let component: PopupArticuloDistribucionConsultaComponent;
  let fixture: ComponentFixture<PopupArticuloDistribucionConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupArticuloDistribucionConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupArticuloDistribucionConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
