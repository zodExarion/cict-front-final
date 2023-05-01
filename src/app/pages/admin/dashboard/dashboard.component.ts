import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  selectedFile: File;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private location: Location
  ) {}

  auth: any = [];

  public form = {
    user_id: null,
    username: null,
    email: null,
    first_name: null,
    middle_name: null,
    last_name: null,
    position: null,
    course_program: null,
    dob: null,
    age: null,
    address: null,
  };

  update() {
    if (this.form.username == null || this.form.username == '')
      this.form.username = this.auth.username;
    if (this.form.email == null || this.form.email == '')
      this.form.email = this.auth.email;
    if (this.form.first_name == null || this.form.first_name == '')
      this.form.first_name = this.auth.first_name;
    if (this.form.middle_name == null)
      this.form.middle_name = this.auth.middle_name;
    if (this.form.last_name == null || this.form.last_name == '')
      this.form.last_name = this.auth.last_name;
    if (this.form.position == null || this.form.position == '')
      this.form.position = this.auth.position;
    if (this.form.course_program == null || this.form.course_program == '')
      this.form.course_program = this.auth.course_program;
    if (this.form.dob == null) this.form.dob = this.auth.dob;
    if (this.form.age == null || this.form.age == '')
      this.form.age = this.auth.age;
    if (this.form.address == null || this.form.address == '')
      this.form.address = this.auth.address;

    this.form.user_id = this.auth.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>('http://127.0.0.1:8000/api/users/update', this.form, {
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

  ngOnInit() {
    this.getSession();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    let headers;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.selectedFile);
    fileReader.onload = () => {
      const boundary = '----AngularLaravelBoundary';
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;
      let body = '';
      body += `${delimiter}Content-Disposition: form-data; name="file"; filename="${this.selectedFile.name}"\r\n`;
      body += `Content-Type: ${this.selectedFile.type}\r\n\r\n`;
      body += '\r\n' + fileReader.result + '\r\n';
      body += closeDelimiter;

      headers = new HttpHeaders().append(
        'Content-Type',
        `multipart/form-data; boundary=${boundary}`
      );
    };

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('id', this.auth.id);

    this.http
      .post('http://127.0.0.1:8000/api/users/upload', formData, { headers })
      .subscribe((response) => {
        if (response) {
          window.location.reload();
        }
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
}
