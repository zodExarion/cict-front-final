import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  register(data:any){
    return this.http.post('http://localhost/angular_admin/php"', data);
  }
}
// http://127.0.0.1:8000/api/register