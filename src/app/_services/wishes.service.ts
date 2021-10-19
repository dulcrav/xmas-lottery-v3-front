import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewWish } from "../model/new-wish.model";

const API_URL = 'http://localhost:8080/api/xmas/test/wish/';

@Injectable({
    providedIn: 'root'
})
export class WishesService {
    constructor(private http: HttpClient) { }
    
    saveWish(wish: NewWish): Observable<any> {
        return this.http.post(API_URL + 'add', wish);
    }
}