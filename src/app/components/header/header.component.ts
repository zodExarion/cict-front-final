import { DOCUMENT, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  name: any;
  url: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getSession();
  }

  // secure route
  getSession() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.http
        .get<any>('http://127.0.0.1:8000/api/users/login/' + user)
        .subscribe((data) => {
          this.name = data.first_name + ' ' + data.last_name;
          this.url = data.image_url;
          return;
        });
    } else {
      this.name = 'Not Logged In';
    }
  }
}
