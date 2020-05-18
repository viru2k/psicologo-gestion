import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlParametroComponent } from './popup-control-parametro.component';

describe('PopupControlParametroComponent', () => {
  let component: PopupControlParametroComponent;
  let fixture: ComponentFixture<PopupControlParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupControlParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
