import { DOCUMENT, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-faculty-schedule',
  templateUrl: './faculty-schedule.component.html',
  styleUrls: ['./faculty-schedule.component.css'],
})
export class FacultyScheduleComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private location: Location
  ) {}

  public schedules: any[];
  public semesters: any[];
  public sections: any[];
  public subjects: any[];
  public users: any[];
  public rooms: any[];
  public form = {
    user_id: null,
    room_id: null,
    section_id: null,
    subject_id: null,
    semester_id: null,
    attendance_group: null,
    attendance_day: null,
    attendance_start_time: null,
    attendance_end_time: null,
  };

  public error = {
    user_id: null,
    room_id: null,
    section_id: null,
    subject_id: null,
    semester_id: null,
    attendance_group: null,
    attendance_day: null,
    attendance_start_time: null,
    attendance_end_time: null,
  };

  subjectChange(value) {
    this.error.subject_id = null;
  }

  sectionChange(value) {
    this.error.section_id = null;
  }

  facultyChange(value) {
    this.error.user_id = null;
  }

  roomChange(value) {
    this.error.room_id = null;
  }

  groupChange(value) {
    this.error.attendance_group = null;
  }

  semesterChange(value) {
    this.error.semester_id = null;
  }

  dayChange(value) {
    this.error.attendance_day = null;
  }

  startChange(value) {
    this.error.attendance_start_time = null;
  }

  endChange(value) {
    this.error.attendance_end_time = null;
  }

  ngOnInit(): void {
    this.getSession();
    this.http
      .get<any>('http://127.0.0.1:8000/api/attendances')
      .subscribe((data) => {
        this.schedules = data.attendances;

        this.sections = data.sections.map((item) => {
          return { value: item.id, label: item.section_name };
        });

        this.subjects = data.subjects.map((item) => {
          return { value: item.id, label: item.subject_name };
        });

        this.semesters = data.semesters.map((item) => {
          return { value: item.id, label: item.semester_name };
        });

        this.users = data.users.map((item) => {
          const facultyName = `${item.first_name} ${item.last_name}`;
          return { value: item.id, label: facultyName };
        });

        this.rooms = data.rooms.map((item) => {
          return { value: item.id, label: item.room_name };
        });

        this.initializeDataTable();
      });
  }

  auth: any;

  // secure route
  getSession() {
    const user = sessionStorage.getItem('user');

    if (user) {
      this.http
        .get<any>('http://127.0.0.1:8000/api/users/login/' + user)
        .subscribe((data) => {
          if (data) {
            this.auth = data;
            if (data.role_type == 2) {
              this.document.location.href = '/faculty/attendance-summary';
            } else if (data.role_type == 3) {
              this.document.location.href = '/checker/schedule-attendance';
            }
          } else {
            this.document.location.href = '/';
          }
        });
    } else {
      this.document.location.href = '/';
    }
  }

  initializeDataTable(): void {
    const options: any = {
      searching: true,
      paging: true,
      pageLength: 10,
      data: this.schedules,
      columns: [
        { title: 'Subject Name', data: 'subject_name' },
        { title: 'Section Name', data: 'section_name' },
        {
          title: 'Faculty name',
          render: function (data, type, row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        { title: 'Room Name', data: 'room_name' },
      ],
    };

    $('#myTable').DataTable(options);
  }

  submitRegFaculty() {
    if (this.form.subject_id == null || this.form.subject_id == '')
      return (this.error.subject_id = 'Subject name is required.');
    this.error.subject_id = null;
    if (this.form.section_id == null || this.form.section_id == '')
      return (this.error.section_id = 'Section name is required.');
    if (this.form.user_id == null || this.form.user_id == '')
      return (this.error.user_id = 'Faculty name is required.');
    if (this.form.room_id == null || this.form.room_id == '')
      return (this.error.room_id = 'Room name is required.');
    if (this.form.attendance_group == null || this.form.attendance_group == '')
      return (this.error.attendance_group = 'Group is required.');
    if (this.form.semester_id == null || this.form.semester_id == '')
      return (this.error.semester_id = 'Semester is required.');
    if (
      this.form.attendance_start_time == null ||
      this.form.attendance_start_time == ''
    )
      return (this.error.attendance_start_time = 'Start time is required.');
    if (
      this.form.attendance_end_time == null ||
      this.form.attendance_end_time == ''
    )
      return (this.error.attendance_end_time = 'End time is required.');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>('http://127.0.0.1:8000/api/attendances', this.form, {
        headers,
      })
      .subscribe((data) => {
        if (data?.message) {
          this.reloadPage();
        }
      });
  }

  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
}
