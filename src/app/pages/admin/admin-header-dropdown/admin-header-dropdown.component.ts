import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-admin-header-dropdown',
  templateUrl: './admin-header-dropdown.component.html',
  styleUrls: ['./admin-header-dropdown.component.css'],
})
export class AdminHeaderDropdownComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  onLogout() {
    const user_id = sessionStorage.getItem('user_id');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(
        'http://127.0.0.1:8000/api/users/logout',
        { id: user_id },
        { headers }
      )
      .subscribe((data) => {
        if (data?.message) {
          sessionStorage.clear();
          window.location.href = '/';
        }
      });
  }
}
