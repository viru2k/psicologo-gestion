import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilControlCalidadConsultaComponent } from './mobil-control-calidad-consulta.component';

describe('MobilControlCalidadConsultaComponent', () => {
  let component: MobilControlCalidadConsultaComponent;
  let fixture: ComponentFixture<MobilControlCalidadConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilControlCalidadConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilControlCalidadConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
