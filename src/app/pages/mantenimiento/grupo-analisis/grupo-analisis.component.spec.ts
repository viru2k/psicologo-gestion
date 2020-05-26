import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoAnalisisComponent } from './grupo-analisis.component';

describe('GrupoAnalisisComponent', () => {
  let component: GrupoAnalisisComponent;
  let fixture: ComponentFixture<GrupoAnalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoAnalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
