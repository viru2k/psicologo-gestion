import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionPersonalComponent } from './notificacion-personal.component';

describe('NotificacionPersonalComponent', () => {
  let component: NotificacionPersonalComponent;
  let fixture: ComponentFixture<NotificacionPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
