import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private rolesSubject: BehaviorSubject<any>;
  public roles: Observable<any>;
  readonly rootURL = "http://localhost:59786/api";
  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.rolesSubject = new BehaviorSubject<any>((localStorage.getItem('roles')));
    this.roles = this.rolesSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get rolesValue(): any {
    return this.rolesSubject.value;
  }
  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
  loginTrainee(username: string, password: string) {
    return this.http.get(this.rootURL + '/trainees/Login?Email=' + username + '&Password=' + password)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('roles', 'Trainee');
        this.currentUserSubject.next(user);
        this.rolesSubject.next(user);
        return user;
      }));
  }
  loginMentor(username: string, password: string) {
    return this.http.get(this.rootURL + '/mentors/Login?Email=' + username + '&Password=' + password)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('roles', 'Mentor');
        this.currentUserSubject.next(user);
        this.rolesSubject.next(user);
        return user;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.clear();
  }
}
