import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const apiUrl = `https://pure-tundra-55078.herokuapp.com/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.login()', () => {
    it('should call /login_check and return response if credentials are used',
      inject([AuthService, HttpClient], (authService: AuthService, http: HttpClient) => {
        const response = { success: true };
        const username = 'jeff@bezos.com';
        const password = 'iluvmoney4eva';

        spyOn(http, 'post').and.returnValue(of(response));

        authService.login(username, password).subscribe();
        expect(http.post).toHaveBeenCalledWith(`${apiUrl}/login_check`, { username, password });
      }));
  });
});
