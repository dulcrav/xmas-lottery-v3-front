import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators'
import { NewKidsWish } from "../model/new-kidswish.model";

const API_URL = 'http://localhost:8080/api/xmas/test/kidswish/';

@Injectable({
    providedIn: 'root'
})
export class KidsWishesService {
    constructor(private http: HttpClient) {}

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

    saveKidsWish(wish: NewKidsWish): Observable<any> {
        return this.http.post(API_URL + 'add', wish).pipe(
            catchError(this.handleError)
        );
    }

    getKidsWishes(): Observable<any> {
        return this.http.get(API_URL + "all");
    }

    deleteKidsWish(wishId: number): Observable<any> {
        let params = new HttpParams().set("wishId", wishId + "");
        return this.http.delete(API_URL + "delete", { params: params});
    }
}