import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTrabajoAsociarEditarComponent } from './grupo-trabajo-asociar-editar.component';

describe('GrupoTrabajoAsociarEditarComponent', () => {
  let component: GrupoTrabajoAsociarEditarComponent;
  let fixture: ComponentFixture<GrupoTrabajoAsociarEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTrabajoAsociarEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTrabajoAsociarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
