import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: Observable<string>;

  private tokenKey = 'current-token';
  private tokenSubject: BehaviorSubject<string>;

  public get tokenValue(): string {
    return this.tokenSubject.value;
  }

  constructor(private router: Router, private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem(this.tokenKey))
    );
    this.token = this.tokenSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/login_check`, { username, password })
      .pipe(
        map((token) => {
          localStorage.setItem(this.tokenKey, JSON.stringify(token));
          this.tokenSubject.next(token);
          return token;
        }),
        first()
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
    this.router.navigate(['/']);
  }
}
