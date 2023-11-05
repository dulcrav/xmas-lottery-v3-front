import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewPassword } from '../model/new-password.model';

// const API_URL = 'http://ec2-3-74-153-121.eu-central-1.compute.amazonaws.com:8080/api/xmas/test/';
const API_URL = 'http://localhost:8080/api/xmas/test/';
const API_ALTERATION_URL = 'http://localhost:8080/api/xmas/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  deleteUser(userId: number): Observable<any> {
    let params = new HttpParams().set("userId", userId + "");
    return this.http.delete(API_ALTERATION_URL + 'delete', { params: params});
  }

  changeUserPassword(userId: number, password: NewPassword): Observable<any> {
    let params = new HttpParams().set("userId", userId + "");
    return this.http.patch(API_ALTERATION_URL + 'changePassword', password, { params: params});
  }
}
