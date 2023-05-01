import { DOCUMENT, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-checker-key-inventory',
  templateUrl: './checker-key-inventory.component.html',
  styleUrls: ['./checker-key-inventory.component.css'],
})
export class CheckerKeyInventoryComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  public attendances: any[];
  public semesters: any[];
  public users: any[];
  public rooms: any[];

  ngOnInit(): void {
    this.getSession();
    this.http
      .get<any>('http://127.0.0.1:8000/api/attendances')
      .subscribe((data) => {
        this.attendances = data.attendances.map((item) => ({
          name: item.room_name,
          first_name: item.first_name,
          last_name: item.last_name,
          day: item.attendance_day,
          room_status: item.room_status,
          created_at: this.datePipe.transform(item.created_at, 'dd-MM-yyyy'),
          start_time: this.datePipe.transform(
            `2000-01-01T${item.attendance_start_time}`,
            'h:mm a'
          ),
          end_time: this.datePipe.transform(
            `2000-01-01T${item.attendance_end_time}`,
            'h:mm a'
          ),
          schedule_status: item.attendance_status
            ? item.attendance_status
            : '-',
          comments: item.attendance_comments ? item.attendance_comments : '-',
          semester: item.semester_name,
        }));

        this.semesters = data.semesters.map((semester) => {
          return semester.semester_name;
        });

        this.users = data.users.map((item) => {
          const facultyName = `${item.first_name} ${item.last_name}`;
          return { value: item.id, label: facultyName };
        });

        this.rooms = data.rooms.map((item) => {
          return { value: item.id, label: item.name };
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
            if (data.role_type == 1) {
              this.document.location.href = '/admin/dashboard';
            } else if (data.role_type == 2) {
              this.document.location.href = '/faculty/attendance-summary';
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
      data: this.attendances,
      columns: [
        { title: 'Room Name', data: 'name' },
        { title: 'Keys', data: 'room_status' },
        {
          title: 'Scheduled Faculty',
          render: function (data, type, row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        {
          title: 'Time',
          render: function (data, type, row) {
            return `${row.start_time} - ${row.end_time}`;
          },
        },
      ],
    };

    $('#myTable').DataTable(options);
  }
}
