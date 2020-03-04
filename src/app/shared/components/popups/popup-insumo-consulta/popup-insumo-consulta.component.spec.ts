import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInsumoConsultaComponent } from './popup-insumo-consulta.component';

describe('PopupInsumoConsultaComponent', () => {
  let component: PopupInsumoConsultaComponent;
  let fixture: ComponentFixture<PopupInsumoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupInsumoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInsumoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
