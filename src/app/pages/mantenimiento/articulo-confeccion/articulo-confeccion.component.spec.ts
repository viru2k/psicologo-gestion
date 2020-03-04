import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloConfeccionComponent } from './articulo-confeccion.component';

describe('ArticuloConfeccionComponent', () => {
  let component: ArticuloConfeccionComponent;
  let fixture: ComponentFixture<ArticuloConfeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloConfeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloConfeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
