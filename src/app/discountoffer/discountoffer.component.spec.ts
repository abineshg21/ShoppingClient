import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountofferComponent } from './discountoffer.component';

describe('DiscountofferComponent', () => {
  let component: DiscountofferComponent;
  let fixture: ComponentFixture<DiscountofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
