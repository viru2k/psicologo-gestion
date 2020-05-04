import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTrabajoEditarComponent } from './grupo-trabajo-editar.component';

describe('GrupoTrabajoEditarComponent', () => {
  let component: GrupoTrabajoEditarComponent;
  let fixture: ComponentFixture<GrupoTrabajoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTrabajoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTrabajoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
