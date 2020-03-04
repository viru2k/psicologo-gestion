import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionindicadoresComponent } from './produccionindicadores.component';

describe('ProduccionindicadoresComponent', () => {
  let component: ProduccionindicadoresComponent;
  let fixture: ComponentFixture<ProduccionindicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduccionindicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionindicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
