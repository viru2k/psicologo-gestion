import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisoresComponent } from './revisores.component';

describe('RevisoresComponent', () => {
  let component: RevisoresComponent;
  let fixture: ComponentFixture<RevisoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
