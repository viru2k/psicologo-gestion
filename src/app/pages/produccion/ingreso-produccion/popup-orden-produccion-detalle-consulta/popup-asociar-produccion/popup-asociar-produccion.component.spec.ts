import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAsociarProduccionComponent } from './popup-asociar-produccion.component';

describe('PopupAsociarProduccionComponent', () => {
  let component: PopupAsociarProduccionComponent;
  let fixture: ComponentFixture<PopupAsociarProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAsociarProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAsociarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
