import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAttendanceCheckerComponent } from './account-attendance-checker.component';

describe('AccountAttendanceCheckerComponent', () => {
  let component: AccountAttendanceCheckerComponent;
  let fixture: ComponentFixture<AccountAttendanceCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAttendanceCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAttendanceCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
