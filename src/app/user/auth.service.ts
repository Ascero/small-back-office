import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { IToken } from './models/token.model';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: Observable<IToken>;

  // Key where user credentials are stored.
  private tokenKey = 'current-token';
  private tokenSubject: BehaviorSubject<IToken>;

  /**
   * Value of tokenSubject
   * An IToken object.
   */
  public get tokenValue(): IToken {
    return this.tokenSubject.value;
  }

  constructor(private router: Router, private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<IToken>(
      JSON.parse(localStorage.getItem(this.tokenKey))
    );
    this.token = this.tokenSubject.asObservable();
  }

  /**
   * Method that ask for a token using as parameters user credentials.
   * @param username customer email
   * @param password customer password
   */
  login(username: string, password: string): Observable<IToken> {
    return this.http.post<IToken>(`${environment.apiUrl}/api/login_check`, { username, password })
      .pipe(
        map((response) => {
          localStorage.setItem(this.tokenKey, JSON.stringify({token: response.token, user: username}));
          this.tokenSubject.next({token: response.token, user: username});
          return {token: response.token, user: username};
        }),
        first()
      );
  }

  /**
   * Removes token and user from local storage and navigates to login page.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
    this.router.navigate(['/']);
  }
}
