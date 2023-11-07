import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewPassword } from '../model/new-password.model';
import { environment } from 'src/environments/environment';

const API_URL = '/api/xmas/test/';
const API_ALTERATION_URL = '/api/xmas/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(environment.baseUrl + API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(environment.baseUrl + API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(environment.baseUrl + API_URL + 'admin', { responseType: 'text' });
  }

  deleteUser(userId: number): Observable<any> {
    let params = new HttpParams().set("userId", userId + "");
    return this.http.delete(environment.baseUrl + API_ALTERATION_URL + 'delete', { params: params});
  }

  changeUserPassword(userId: number, password: NewPassword): Observable<any> {
    let params = new HttpParams().set("userId", userId + "");
    return this.http.patch(environment.baseUrl + API_ALTERATION_URL + 'changePassword', password, { params: params});
  }
}
