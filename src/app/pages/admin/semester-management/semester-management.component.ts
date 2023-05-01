import { DOCUMENT, DatePipe, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-semester-management',
  templateUrl: './semester-management.component.html',
  styleUrls: ['./semester-management.component.css'],
})
export class SemesterManagementComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient,
    private location: Location
  ) {}

  semesters: any[];

  ngOnInit() {
    this.getSession();
    this.http
      .get<any>('http://127.0.0.1:8000/api/semesters')
      .subscribe((data) => {
        this.semesters = data.semesters.map((item) => ({
          semester_id: item.id,
          semester_name: item.semester_name,
          created_at: this.datePipe.transform(item.created_at, 'dd-MM-yyyy'),
        }));
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

  public form = {
    semester_name: null,
  };

  public error = {
    semester_name: null,
  };

  semesterChange(value) {
    return (this.error.semester_name = null);
  }

  submitSemester() {
    if (this.form.semester_name == null || this.form.semester_name == '') {
      this.error.semester_name = 'Semester is required.';
      // return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>('http://127.0.0.1:8000/api/semesters', this.form, { headers })
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

  initializeDataTable(): void {
    const options: any = {
      searching: true,
      paging: true,
      pageLength: 10,
      data: this.semesters,
      columns: [
        { title: 'Semester Name', data: 'semester_name' },
        { title: 'Date', data: 'created_at' },
        {
          title: 'Action',
          data: 'section_id',
          render: function (data, type, row) {
            return `<div class="d-flex gap-2">
                      <div>
                        <iframe
                          name="dummyframe"
                          id="dummyframe"
                          style="display: none"
                          data-bs-dismiss="modal"
                        ></iframe>
                        <a
                          class="btn btn-primary"
                          role="button"
                          href="#myModal${row.semester_id}"
                          data-bs-toggle="modal"
                          >Update</a
                        >
                        <div
                          id="myModal${row.semester_id}"
                          class="modal fade"
                          role="dialog"
                          tabindex="-1"
                        >
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe>
                            <div class="modal-content">
                              <form method="POST" action="http://127.0.0.1:8000/api/semesters/update" target="dummyframe">
                                <div class="modal-header">
                                  <h4>Semester Details</h4>
                                  <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <div class="p-5">
                                    <input class="form-control" type="hidden" name="semester_id" value="${row.semester_id}"/>
                                    <div class="mb-3">
                                      <label for="email">Semester Name</label>
                                      <input class="form-control" type="text" name="semester_name" value="${row.semester_name}"/>
                                    </div>
                                  </div>
                                </div>
                                <div class="modal-footer">
                                  <button class="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
                                  <button class="btn btn-primary" type="submit" data-bs-dismiss="modal">Save</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form method="POST" action="http://127.0.0.1:8000/api/semesters/delete" target="dummyframe">
                        <input class="form-control" type="hidden" name="semester_id" value="${row.semester_id}"/>
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </form>
                    </div>`;
          },
        },
      ],
    };

    $('#myTable').DataTable(options);
  }
}
