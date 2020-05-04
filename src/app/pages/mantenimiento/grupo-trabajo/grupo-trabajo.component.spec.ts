import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTrabajoComponent } from './grupo-trabajo.component';

describe('GrupoTrabajoComponent', () => {
  let component: GrupoTrabajoComponent;
  let fixture: ComponentFixture<GrupoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
