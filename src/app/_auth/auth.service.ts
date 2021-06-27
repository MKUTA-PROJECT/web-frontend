import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(null);
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.base_url}login/`, { email, password }, { withCredentials: true })
          .pipe(map(user => {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
          }));
  }

  logout() {
        localStorage.removeItem('loggedInUser');
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

  refreshToken() {
      
      return this.http.post<any>(`${environment.base_url}token/refresh/`, {'refresh': this.getRefreshToken()}, { withCredentials: true })
          .pipe(map((user) => {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            this.userSubject.next(user);
            this.startRefreshTokenTimer();
            return user;
          }));
  }

  private getRefreshToken() {
   let user = JSON.parse(window.localStorage.getItem('loggedInUser'));
    console.log(user)
    if(user){
        return user['refresh']
    }
    else{
        return ''
    }
   
  }
  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(this.userValue.access.split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }
}
