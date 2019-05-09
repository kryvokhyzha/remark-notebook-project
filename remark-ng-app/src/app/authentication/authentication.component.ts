import {Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, first } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { User } from '../shared/user.service';
import {UserModel} from '../../models/user';
import {ApiService} from '../shared/api.service';
import {Note} from '../notes/model/note';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit {
  user: UserModel[] = [];
  private currentAdminSubject: BehaviorSubject<User>;
  public currentAdmin: Observable<User>;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private apiService: ApiService ) {
    this.currentAdminSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentAdminSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<User>(`http://localhost:8081/api/user/byUsername/${username}`)
      .pipe(first())
      .pipe(catchError(this.handleError))
      .pipe(map(res => {
      if (res && res.password === password) {
        localStorage.setItem('user', JSON.stringify(res));
        this.currentAdminSubject.next(res);
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
    this.currentAdminSubject.next(null);
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
