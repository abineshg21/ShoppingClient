import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenucommonComponent } from './admin-menucommon.component';

describe('AdminMenucommonComponent', () => {
  let component: AdminMenucommonComponent;
  let fixture: ComponentFixture<AdminMenucommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenucommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenucommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
