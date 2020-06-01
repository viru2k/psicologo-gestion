import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNoticiasNuevoComponent } from './popup-noticias-nuevo.component';

describe('PopupNoticiasNuevoComponent', () => {
  let component: PopupNoticiasNuevoComponent;
  let fixture: ComponentFixture<PopupNoticiasNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNoticiasNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNoticiasNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
