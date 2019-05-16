import {Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, first } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {UserModel} from '../models/user';
import {ApiService} from '../shared/api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit {
  user: UserModel[] = [];

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private apiService: ApiService ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.getUserByUsername(username)
      .pipe(first())
      .pipe(catchError(this.handleError))
      .pipe(map(res => {
        if (res && res.password === password) {
          localStorage.setItem('user', JSON.stringify(res));
          this.currentUserSubject.next(res);
          return res;
        } else if (!res) {
          return new Error('Invalid username!');
        } else if (res.password !== password) {
          return new Error('Invalid password!');
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
