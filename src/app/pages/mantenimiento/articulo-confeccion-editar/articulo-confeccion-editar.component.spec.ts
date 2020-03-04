import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloConfeccionEditarComponent } from './articulo-confeccion-editar.component';

describe('ArticuloConfeccionEditarComponent', () => {
  let component: ArticuloConfeccionEditarComponent;
  let fixture: ComponentFixture<ArticuloConfeccionEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloConfeccionEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloConfeccionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
