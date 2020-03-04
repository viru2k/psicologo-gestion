import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadTipoControlComponent } from './calidad-tipo-control.component';

describe('CalidadTipoControlComponent', () => {
  let component: CalidadTipoControlComponent;
  let fixture: ComponentFixture<CalidadTipoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadTipoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadTipoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
