import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoEditarComponent } from './insumo-editar.component';

describe('InsumoEditarComponent', () => {
  let component: InsumoEditarComponent;
  let fixture: ComponentFixture<InsumoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
