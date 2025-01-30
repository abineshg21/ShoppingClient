import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrinterConfigComponent } from './admin-printer-config.component';

describe('AdminPrinterConfigComponent', () => {
  let component: AdminPrinterConfigComponent;
  let fixture: ComponentFixture<AdminPrinterConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPrinterConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrinterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
