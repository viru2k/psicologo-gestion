import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadindicadoresComponent } from './calidadindicadores.component';

describe('CalidadindicadoresComponent', () => {
  let component: CalidadindicadoresComponent;
  let fixture: ComponentFixture<CalidadindicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadindicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadindicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
