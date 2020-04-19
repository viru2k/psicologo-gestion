import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAsociarFacturaComponent } from './popup-asociar-factura.component';

describe('PopupAsociarFacturaComponent', () => {
  let component: PopupAsociarFacturaComponent;
  let fixture: ComponentFixture<PopupAsociarFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAsociarFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAsociarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
