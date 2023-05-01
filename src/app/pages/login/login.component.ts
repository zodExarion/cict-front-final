import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    username: null,
    password: null,
  };

  public error = {
    username: null,
    password: null,
  };

  loggedIn = false;

  usernameChange(value) {
    this.error.username = null;
  }

  passwordChange(value) {
    this.error.password = null;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Check if the user is already logged in
    this.getSession();
  }

  submitLogin() {
    if (this.form.username == null || this.form.username == '')
      this.error.username = 'Username is required.';
    if (this.form.password == null || this.form.password == '')
      this.error.password = 'Password is required.';
    if (
      this.form.username == null ||
      this.form.username == '' ||
      this.form.password == null ||
      this.form.password == ''
    ) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<any>('http://127.0.0.1:8000/api/users/authenticate', this.form, {
        headers,
      })
      .subscribe((data) => {
        if (data) {
          sessionStorage.setItem('user', data.employee_id);
          sessionStorage.setItem('user_id', data.id);
          if (data.role_type == 1) {
            this.document.location.href = '/admin/dashboard';
          } else if (data.role_type == 2) {
            this.document.location.href = '/faculty/attendance-summary';
          } else if (data.role_type == 3) {
            this.document.location.href = '/checker/schedule-attendance';
          }
        } else {
          this.error.password = 'Email and password not not match.';
        }
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
            if (this.auth.role_type == 1) {
              this.document.location.href = '/admin/dashboard';
            } else if (this.auth.role_type == 2) {
              this.document.location.href = '/faculty/attendance-summary';
            } else if (this.auth.role_type == 3) {
              this.document.location.href = '/checker/schedule-attendance';
            }
          }
        });
    }
  }
}
