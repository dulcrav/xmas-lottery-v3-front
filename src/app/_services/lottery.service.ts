import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

const API_URL = '/xmas/api/lottery/';

@Injectable({
    providedIn: 'root'
})

export class LotteryService {
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

    getLots(): Observable<any> {
        return this.http.get(environment.baseUrl + API_URL);
    }

    drawLots(): Observable<any> {
        return this.http.post(environment.baseUrl + API_URL, null).pipe(
            catchError(this.handleError)
        );
    }

    getLotByPlayer(id: number): Observable<any> {
        let params = new HttpParams().set("id", id + "");
        return this.http.get(environment.baseUrl + API_URL + "result", {params: params});
    }
}