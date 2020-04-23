import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOrdenProduccionEditarComponent } from './pop-orden-produccion-editar.component';

describe('PopOrdenProduccionEditarComponent', () => {
  let component: PopOrdenProduccionEditarComponent;
  let fixture: ComponentFixture<PopOrdenProduccionEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOrdenProduccionEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOrdenProduccionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
