import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { RedirectService } from '../../core/redirect.service';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private redirectService: RedirectService
  ) {
  }

  /**
   * Guard to avoid logged in users to visit admin pages.
   * Also admin users should not visit regular customer pages.
   * Current pages: Exchange page.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storedAuth = this.authenticationService.tokenValue;
    if (!!storedAuth && storedAuth.token && storedAuth.user !== 'admin@msi-pay.com') {
      return true;
    } else if (!!storedAuth && storedAuth.token && storedAuth.user === 'admin@msi-pay.com') {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      this.redirectService.setLoginRedirectUrl(state.url);
      this.router.navigate(['/']);
      return false;
    }
  }
}
