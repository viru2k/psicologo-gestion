import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadControlComponent } from './calidad-control.component';

describe('CalidadControlComponent', () => {
  let component: CalidadControlComponent;
  let fixture: ComponentFixture<CalidadControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
