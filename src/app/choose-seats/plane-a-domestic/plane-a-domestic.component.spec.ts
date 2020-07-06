import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneADomesticComponent } from './plane-a-domestic.component';

describe('PlaneADomesticComponent', () => {
  let component: PlaneADomesticComponent;
  let fixture: ComponentFixture<PlaneADomesticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneADomesticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneADomesticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
