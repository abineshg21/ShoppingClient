import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaruntAdminComponent } from './restarunt-admin.component';

describe('RestaruntAdminComponent', () => {
  let component: RestaruntAdminComponent;
  let fixture: ComponentFixture<RestaruntAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaruntAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaruntAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
