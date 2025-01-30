import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerActivationComponent } from './customer-activation.component';

describe('CustomerActivationComponent', () => {
  let component: CustomerActivationComponent;
  let fixture: ComponentFixture<CustomerActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
