import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTrabajoAsociarComponent } from './grupo-trabajo-asociar.component';

describe('GrupoTrabajoAsociarComponent', () => {
  let component: GrupoTrabajoAsociarComponent;
  let fixture: ComponentFixture<GrupoTrabajoAsociarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTrabajoAsociarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTrabajoAsociarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
