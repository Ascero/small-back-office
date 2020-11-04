import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  public loginReturnUrl: string;

  setLoginRedirectUrl(value: string): void {
    this.loginReturnUrl = value;
  }
}
