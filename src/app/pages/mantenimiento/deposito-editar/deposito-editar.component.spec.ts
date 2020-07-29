import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoEditarComponent } from './deposito-editar.component';

describe('DepositoEditarComponent', () => {
  let component: DepositoEditarComponent;
  let fixture: ComponentFixture<DepositoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
