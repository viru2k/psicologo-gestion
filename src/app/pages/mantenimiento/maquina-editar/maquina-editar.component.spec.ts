import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaEditarComponent } from './maquina-editar.component';

describe('MaquinaEditarComponent', () => {
  let component: MaquinaEditarComponent;
  let fixture: ComponentFixture<MaquinaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
