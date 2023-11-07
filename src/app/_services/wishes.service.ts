import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { NewWish } from "../model/new-wish.model";
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const API_URL = '/api/xmas/test/wish/';

@Injectable({
    providedIn: 'root'
})
export class WishesService {
    constructor(private http: HttpClient) { }
    
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }
    
    saveWish(wish: NewWish): Observable<any> {
        return this.http.post(environment.baseUrl + API_URL + 'add', wish).pipe(
            catchError(this.handleError)
        );
    }

    getWishesByUserId(userId: number): Observable<any> {
        let params = new HttpParams().set("userId", userId + "")
        return this.http.get(environment.baseUrl + API_URL + "all", { params: params })
    }

    getAllWishes(): Observable<any> {
        return this.http.get(environment.baseUrl + API_URL + 'all-wishes');
    }

    deleteWish(wishId: number): Observable<any> {
        let params = new HttpParams().set("wishId", wishId + "");
        return this.http.delete(environment.baseUrl + API_URL + "delete", { params: params});
    }
}