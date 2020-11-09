import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService
  ) {
  }

  /**
   * Interceptor that add the user current session token to
   * all request done to BE.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.tokenValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token[`token`]}`,
        },
      });
    }

    return next.handle(request);
  }
}
