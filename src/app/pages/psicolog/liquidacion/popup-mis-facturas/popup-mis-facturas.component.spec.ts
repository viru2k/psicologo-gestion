import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMisFacturasComponent } from './popup-mis-facturas.component';

describe('PopupMisFacturasComponent', () => {
  let component: PopupMisFacturasComponent;
  let fixture: ComponentFixture<PopupMisFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMisFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMisFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
