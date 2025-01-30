import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdminComponent } from './tax-admin.component';

describe('TaxAdminComponent', () => {
  let component: TaxAdminComponent;
  let fixture: ComponentFixture<TaxAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
