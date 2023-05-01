import { HttpClient } from '@angular/common/http';
import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-key-history',
  templateUrl: './key-history.component.html',
  styleUrls: ['./key-history.component.css'],
})
export class KeyHistoryComponent {
  public histories: any[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getSession();
    this.http.get<any>('http://127.0.0.1:8000/api/keys').subscribe((data) => {
      this.histories = data.histories.map((item) => ({
        name: item.room_name,
        first_name: item.first_name,
        last_name: item.last_name,
        created_at: this.datePipe.transform(item.created_at, 'dd-MM-yyyy'),
        time: this.datePipe.transform(`2000-01-01T${item.key_time}`, 'h:mm a'),
        status: item.key_status ? item.key_status : '-',
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

  initializeDataTable(): void {
    const options: any = {
      dom: 'lBfrtip',
      buttons: [
        {
          extend: 'print',
          text: 'Print PDF',
          title: 'Key History',
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
      data: this.histories,
      columns: [
        { title: 'Room Name', data: 'name' },
        {
          title: 'Faculty name',
          render: function (data, type, row) {
            return `${row.first_name} ${row.last_name}`;
          },
        },
        { title: 'Date', data: 'created_at' },
        { title: 'Time', data: 'time' },
        { title: 'Status', data: 'status' },
      ],
    };

    $('#myTable').DataTable(options);
  }
}
