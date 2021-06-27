import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to the api url
      const user = this.authenticationService.userValue;
      const isLoggedIn = user && user.access;
      const isApiUrl = request.url.startsWith(environment.base_url);
      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: { Authorization: `Bearer ${user.access}` }
          });
      }

      return next.handle(request);
  }
}
