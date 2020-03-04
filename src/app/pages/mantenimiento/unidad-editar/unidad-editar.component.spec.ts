import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadEditarComponent } from './unidad-editar.component';

describe('UnidadEditarComponent', () => {
  let component: UnidadEditarComponent;
  let fixture: ComponentFixture<UnidadEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
