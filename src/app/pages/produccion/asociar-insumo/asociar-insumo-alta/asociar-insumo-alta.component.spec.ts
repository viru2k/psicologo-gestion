import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarInsumoAltaComponent } from './asociar-insumo-alta.component';

describe('AsociarInsumoAltaComponent', () => {
  let component: AsociarInsumoAltaComponent;
  let fixture: ComponentFixture<AsociarInsumoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarInsumoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarInsumoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
