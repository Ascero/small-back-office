import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {
  }

  /**
   * Guard to avoid logged in users to visit logged out pages.
   * Current pages: Login page.
   */
  canActivate(): boolean {
    const storedAuth = this.authenticationService.tokenValue;
    if (!!storedAuth) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
