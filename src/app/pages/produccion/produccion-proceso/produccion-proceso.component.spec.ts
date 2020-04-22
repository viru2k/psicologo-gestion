import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionProcesoComponent } from './produccion-proceso.component';

describe('ProduccionProcesoComponent', () => {
  let component: ProduccionProcesoComponent;
  let fixture: ComponentFixture<ProduccionProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduccionProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
