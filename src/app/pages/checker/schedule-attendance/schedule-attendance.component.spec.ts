import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAttendanceComponent } from './schedule-attendance.component';

describe('ScheduleAttendanceComponent', () => {
  let component: ScheduleAttendanceComponent;
  let fixture: ComponentFixture<ScheduleAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
