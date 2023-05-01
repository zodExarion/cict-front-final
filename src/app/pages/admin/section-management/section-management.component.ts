import { DOCUMENT, DatePipe, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css'],
})
export class SectionManagementComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient,
    private location: Location
  ) {}

  sections: any[];
  semesters: any[];

  ngOnInit() {
    this.getSession();
    this.http
      .get<any>('http://127.0.0.1:8000/api/sections')
      .subscribe((data) => {
        this.sections = data.sections.map((item) => ({
          section_id: item.section_id,
          section_name: item.section_name,
          created_at: this.datePipe.transform(item.created_at, 'dd-MM-yyyy'),
          semester: item.semester_name,
          ...item,
        }));
        this.semesters = data.semesters;
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
    semester_id: null,
    section_name: null,
  };

  public error = {
    semester_id: null,
    section_name: null,
  };

  semesterChange(value) {
    return (this.error.semester_id = null);
  }

  sectionChange(value) {
    return (this.error.section_name = null);
  }

  submitSection() {
    if (this.form.semester_id == null || this.form.semester_id == '')
      this.error.semester_id = 'Semester is required.';

    if (this.form.section_name == null || this.form.section_name == '')
      this.error.section_name = 'Semester is required.';

    if (
      this.form.semester_id == null ||
      this.form.semester_id == '' ||
      this.form.section_name == null ||
      this.form.section_name == ''
    ) {
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>('http://127.0.0.1:8000/api/sections', this.form, { headers })
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
      data: this.sections,
      columns: [
        { title: 'Section Name', data: 'section_name' },
        { title: 'Date', data: 'created_at' },
        { title: 'Semester', data: 'semester' },
        {
          title: 'Action',
          data: 'section_id',
          render: function (data, type, row) {
            return `<div class="d-flex gap-2">
                      <div>
                        <iframe name="dummyframe" id="dummyframe" style="display: none" data-bs-dismiss="modal" ></iframe>
                        <a class="btn btn-primary" 
                        role="button" href="#myModal${row.section_id}" 
                        data-bs-toggle="modal">Update</a>
                        <div
                          id="myModal${row.section_id}"
                          class="modal fade"
                          role="dialog"
                          tabindex="-1"
                        >
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe>
                            <div class="modal-content">
                              <form method="POST" action="http://127.0.0.1:8000/api/sections/update" target="dummyframe">
                                <div class="modal-header">
                                  <h4>Sections Details</h4>
                                  <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <div class="p-5">
                                    <input class="form-control" type="hidden" name="section_id" value="${row.section_id}"/>
                                    <div class="mb-3">
                                      <label for="email">Subject Name</label>
                                      <input class="form-control" type="text" name="section_name" value="${row.section_name}"/>
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
                      <form method="POST" action="http://127.0.0.1:8000/api/sections/delete" target="dummyframe">
                        <input class="form-control" type="hidden" name="section_id" value="${row.section_id}"/>
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
