import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { RedirectService } from 'src/app/core/redirect.service';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private redirectService: RedirectService,
  ) {
  }

  /**
   * Guard to show content, only to admin users.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const storedAuth = this.authenticationService.tokenValue;

    // Didn't have anything else to make a difference between an admin and a regular user.
    // So used username, maybe if truly there's nothing, it should be added on Backend.
    if (!!storedAuth && storedAuth.token && storedAuth.user === 'admin@msi-pay.com') {
      return true;
    } else if (!!storedAuth && storedAuth.token && storedAuth.user !== 'admin@msi-pay.com') {
      this.router.navigate(['/exchange']);
      return false;
    } else {
      this.redirectService.setLoginRedirectUrl(state.url);
      this.router.navigate(['/']);
      return false;
    }
  }
}
