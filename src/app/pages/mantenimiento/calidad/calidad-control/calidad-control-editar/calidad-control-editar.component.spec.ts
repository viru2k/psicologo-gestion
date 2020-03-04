import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadControlEditarComponent } from './calidad-control-editar.component';

describe('CalidadControlEditarComponent', () => {
  let component: CalidadControlEditarComponent;
  let fixture: ComponentFixture<CalidadControlEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadControlEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadControlEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
