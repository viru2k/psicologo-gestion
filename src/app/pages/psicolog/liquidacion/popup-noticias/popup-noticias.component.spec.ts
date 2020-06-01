import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNoticiasComponent } from './popup-noticias.component';

describe('PopupNoticiasComponent', () => {
  let component: PopupNoticiasComponent;
  let fixture: ComponentFixture<PopupNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
