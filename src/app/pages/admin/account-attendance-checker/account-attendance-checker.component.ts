import { DOCUMENT, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-account-attendance-checker',
  templateUrl: './account-attendance-checker.component.html',
  styleUrls: ['./account-attendance-checker.component.css'],
})
export class AccountAttendanceCheckerComponent {
  public checkers: any[];
  public form = {
    employee_id: null,
    first_name: null,
    middle_name: null,
    last_name: null,
    username: null,
    email: null,
    position: null,
    course_program: null,
    password: null,
    role_type: 3,
  };

  public error = {
    employee_id: null,
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    position: null,
    course_program: null,
    password: null,
  };

  employeeChange(value) {
    this.error.employee_id = null;
  }

  firstChange(value) {
    this.error.first_name = null;
  }

  lastChange(value) {
    this.error.last_name = null;
  }

  usernameChange(value) {
    this.error.username = null;
  }

  emailChange(value) {
    this.error.email = null;
  }

  positionChange(value) {
    this.error.position = null;
  }

  courseChange(value) {
    this.error.course_program = null;
  }

  passwordChange(value) {
    this.error.password = null;
  }

  isPasswordVisible = false;
  auth: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSession();
    this.http.get<any>('http://127.0.0.1:8000/api/users').subscribe((data) => {
      this.checkers = data.checkers.map((item) => ({
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        last_login: item.last_login ? item.last_login : '-',
        status: item.status ? item.status : '-',
      }));
      this.initializeDataTable();
    });
  }

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
      data: this.checkers,
      columns: [
        {
          title: 'Faculty name',
          render: function (data, type, row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        { title: 'Email', data: 'email' },
        { title: 'Last Login', data: 'last_login' },
        { title: 'Status', data: 'status' },
      ],
    };

    $('#myTable').DataTable(options);
  }

  submitRegFaculty() {
    if (this.form.employee_id == null || this.form.employee_id == '')
      this.error.employee_id = 'Employee ID is required.';
    if (this.form.first_name == null || this.form.first_name == '')
      this.error.first_name = 'First name is required.';
    if (this.form.last_name == null || this.form.last_name == '')
      this.error.last_name = 'Last name is required.';
    if (this.form.username == null || this.form.username == '')
      this.error.username = 'Username is required.';
    if (this.form.email == null || this.form.email == '')
      this.error.email = 'Email is required.';
    if (this.form.position == null || this.form.position == '')
      this.error.position = 'Position is required.';
    if (this.form.course_program == null || this.form.course_program == '')
      this.error.course_program = 'Course program is required.';
    if (this.form.password == null || this.form.password == '')
      this.error.password = 'Password is required.';
    if (
      this.form.employee_id == null ||
      this.form.employee_id == '' ||
      this.form.first_name == null ||
      this.form.first_name == '' ||
      this.form.last_name == null ||
      this.form.last_name == '' ||
      this.form.username == null ||
      this.form.username == '' ||
      this.form.email == null ||
      this.form.email == '' ||
      this.form.position == null ||
      this.form.position == '' ||
      this.form.course_program == null ||
      this.form.course_program == '' ||
      this.form.password == null ||
      this.form.password == ''
    ) {
      return this.error;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>('http://127.0.0.1:8000/api/users', this.form, { headers })
      .subscribe((data) => {
        if (data?.message) {
          this.reloadPage();
        }
      });
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    this.isPasswordVisible = !this.isPasswordVisible;
    passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
  }

  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
}