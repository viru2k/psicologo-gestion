import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoAnalisisEditarComponent } from './grupo-analisis-editar.component';

describe('GrupoAnalisisEditarComponent', () => {
  let component: GrupoAnalisisEditarComponent;
  let fixture: ComponentFixture<GrupoAnalisisEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoAnalisisEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoAnalisisEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
