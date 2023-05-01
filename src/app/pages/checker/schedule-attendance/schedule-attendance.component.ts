import { DOCUMENT, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-schedule-attendance',
  templateUrl: './schedule-attendance.component.html',
  styleUrls: ['./schedule-attendance.component.css'],
})
export class ScheduleAttendanceComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  public attendances: any[];
  public semesters: any[];
  public users: any[];
  public rooms: any[];

  ngOnInit() {
    this.getSession();
    this.http
      .get<any>('http://127.0.0.1:8000/api/attendances')
      .subscribe((data) => {
        this.attendances = data.attendances.map((item) => ({
          id: item.id,
          schedule_id: item.attendance_id,
          name: item.room_name,
          first_name: item.first_name,
          last_name: item.last_name,
          day: item.attendance_day,
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
        {
          title: 'Faculty name',
          render: function (data, type, row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        { title: 'Room Name', data: 'name' },
        { title: 'Day', data: 'day' },
        { title: 'Date', data: 'created_at' },
        {
          title: 'Time',
          render: function (data, type, row) {
            return `${row.start_time} - ${row.end_time}`;
          },
        },
        {
          title: 'Details',
          data: 'id',
          render: function (data, type, row) {
            return `<div>
            
            <iframe name="dummyframe" id="dummyframe" style="display: none;" 
            data-bs-dismiss="modal"></iframe>
            <a
              class="btn btn-primary"
              role="button"
              href="#myModal${row.id}" 
              data-bs-toggle="modal"
              >See Details</a
            >
            <div
              id="myModal${row.id}"
              class="modal fade"
              role="dialog"
              tabindex="-1"
            >
              <div
                class="modal-dialog modal-dialog-centered"
                role="document"
              >
              <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
                <div class="modal-content">
                <form method="POST" action="http://127.0.0.1:8000/api/attendances/update" target="dummyframe">
                  <div class="modal-header">
                    <h4>Attendance Details</h4>
                    <button
                      class="btn-close"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  
                  <div class="modal-body">
                    
                      <div class="p-5">
                        <div class="mb-3">
                          <label for="email">Room Name</label
                          ><input
                            class="form-control"
                            type="text"
                            readonly
                            disabled
                            value="${row.name}"
                          />
                        </div>
                        
                    <input
                    class="form-control"
                    type="hidden"
                    name="id"
                    value="${row.schedule_id}"
                  />
                        <div class="mb-3">
                          <label for="email">Faculty Name</label
                          ><input
                            class="form-control"
                            type="text"
                            readonly
                            disabled
                            value="${row.first_name} ${row.last_name}"
                          />
                        </div>
                        <div class="mb-3">
                          <label>Comment</label
                          >
                          <textarea class="form-control" name="comments">${row.comments}</textarea>
                        </div>
                        <div
                          class="mb-3 d-flex justify-content-center gap-2"
                        >
                          <div class="form-check form-check-inline">
                            <input type="radio" class="btn-check" name="attendance_status" id="option1${row.schedule_id}" value="Present">
                            <label class="btn btn-success" for="option1${row.schedule_id}">Present</label>
                          </div>

                          <div class="form-check form-check-inline">
                            <input type="radio" class="btn-check" name="attendance_status" id="option2${row.schedule_id}" value="Absent">
                            <label class="btn btn-danger" for="option2${row.schedule_id}">Absent</label>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btn-light"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Close</button
                    ><button class="btn btn-primary" type="submit" data-bs-dismiss="modal">
                      Save
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </td>`;
          },
        },
      ],
    };

    $('#myTable').DataTable(options);
  }
}
