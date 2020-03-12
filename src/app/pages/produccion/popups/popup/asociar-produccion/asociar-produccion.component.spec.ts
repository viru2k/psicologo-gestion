import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarProduccionComponent } from './asociar-produccion.component';

describe('AsociarProduccionComponent', () => {
  let component: AsociarProduccionComponent;
  let fixture: ComponentFixture<AsociarProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
