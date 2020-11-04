import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { RedirectService } from '../core/redirect.service';

import { AuthService } from './auth.service';

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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authenticationService.tokenValue;
    if (token) {
      return true;
    } else {
      this.redirectService.setLoginRedirectUrl(state.url);
      this.router.navigate(['/']);
      return false;
    }
  }
}
