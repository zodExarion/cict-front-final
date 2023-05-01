import { DOCUMENT, DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.css'],
})
export class AttendanceSummaryComponent {
  public attendances: any[];
  public semesters: any[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const user_id = sessionStorage.getItem('user_id');
    this.getSession();
    this.http
      .get<any>('http://127.0.0.1:8000/api/attendances/' + user_id)
      .subscribe((data) => {
        this.attendances = data.attendances.map((item) => ({
          name: item.room_name,
          first_name: item.first_name,
          last_name: item.last_name,
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

        this.semesters.unshift('Select Semester');

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
      dom: 'lBfrtip',
      buttons: [
        {
          extend: 'print',
          text: 'Print PDF',
          title: 'Attendance Record',
          exportOptions: {
            modifier: {
              page: 'current',
            },
          },
        },
      ],
      searching: true,
      paging: true,
      pageLength: 10,
      data: this.attendances,
      columns: [
        { title: 'Room Name', data: 'name' },
        {
          title: 'Faculty name',
          render: function (data, type, row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        { title: 'Date', data: 'created_at' },
        {
          title: 'Time',
          render: function (data, type, row) {
            return `${row.start_time} - ${row.end_time}`;
          },
        },
        { title: 'Status', data: 'schedule_status' },
        { title: 'Comments', data: 'comments' },
        { title: 'Semester', data: 'semester', visible: false },
      ],
      createdRow: function (row, data, dataIndex) {
        $(row).addClass(`semester-${data.semester.toLowerCase()}`);
      },
    };

    $('#myTable').DataTable(options);

    // Add event listener to filter by status
    $('#statusFilter').on('change', function () {
      const value = $(this).val().toString().toLowerCase();

      if (value != 'select semester') {
        $('#myTable').DataTable().column(6).search(value).draw();
      } else if (value == 'select semester') {
        $('#myTable').DataTable().column(6).search('').draw();
      } else {
        $('#myTable').DataTable().column(6).search('').draw();
      }
    });
  }
}
