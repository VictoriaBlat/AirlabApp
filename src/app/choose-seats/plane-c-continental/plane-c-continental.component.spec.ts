import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneCContinentalComponent } from './plane-c-continental.component';

describe('PlaneCContinentalComponent', () => {
  let component: PlaneCContinentalComponent;
  let fixture: ComponentFixture<PlaneCContinentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneCContinentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneCContinentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
