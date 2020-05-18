import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadControlParametroComponent } from './calidad-control-parametro.component';

describe('CalidadControlParametroComponent', () => {
  let component: CalidadControlParametroComponent;
  let fixture: ComponentFixture<CalidadControlParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadControlParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadControlParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
