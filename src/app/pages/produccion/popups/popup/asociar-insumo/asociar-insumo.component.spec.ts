import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarInsumoComponent } from './asociar-insumo.component';

describe('AsociarInsumoComponent', () => {
  let component: AsociarInsumoComponent;
  let fixture: ComponentFixture<AsociarInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarInsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
