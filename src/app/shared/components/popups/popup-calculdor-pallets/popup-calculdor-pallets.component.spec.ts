import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCalculdorPalletsComponent } from './popup-calculdor-pallets.component';

describe('PopupCalculdorPalletsComponent', () => {
  let component: PopupCalculdorPalletsComponent;
  let fixture: ComponentFixture<PopupCalculdorPalletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCalculdorPalletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCalculdorPalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
