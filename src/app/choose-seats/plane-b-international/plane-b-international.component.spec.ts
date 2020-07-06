import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneBInternationalComponent } from './plane-b-international.component';

describe('PlaneBInternationalComponent', () => {
  let component: PlaneBInternationalComponent;
  let fixture: ComponentFixture<PlaneBInternationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneBInternationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneBInternationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
