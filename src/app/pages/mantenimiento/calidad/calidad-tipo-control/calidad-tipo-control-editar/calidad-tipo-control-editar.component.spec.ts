import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadTipoControlEditarComponent } from './calidad-tipo-control-editar.component';

describe('CalidadTipoControlEditarComponent', () => {
  let component: CalidadTipoControlEditarComponent;
  let fixture: ComponentFixture<CalidadTipoControlEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadTipoControlEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadTipoControlEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
