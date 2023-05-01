import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-key-inventory',
  templateUrl: './key-inventory.component.html',
  styleUrls: ['./key-inventory.component.css'],
})
export class KeyInventoryComponent {
  public keys: any = [];
  public users: any[];
  public keys_history: any[];
  public faculty_name: any;
  public semesters: any;

  public form = {
    user_id: null,
    room_id: null,
    room_status: null,
    semester_id: null,
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSession();
    this.http.get<any>('http://127.0.0.1:8000/api/rooms').subscribe((data) => {
      this.keys = data.rooms;

      this.keys_history = data.keys;

      this.semesters = data.semesters;

      this.users = data.users.map((item) => {
        const facultyName = `${item.first_name} ${item.last_name}`;
        return { value: item.id, label: facultyName };
      });
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

  handleButtonClick(id: number, semester_id: number, status: any) {
    this.form.room_id = id;
    this.form.semester_id = semester_id;
    this.form.room_status = status;

    this.keys_history.forEach((item) => {
      if (item.room_id === id) {
        this.faculty_name = `${item.first_name} ${item.last_name}`;
        this.form.user_id = item.user_id;
      }
    });
  }

  submitRegFaculty() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>('http://127.0.0.1:8000/api/keys', this.form, {
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
}
