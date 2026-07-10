import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { RoutePath } from '../../../../html/app.route.path';
import { LocalStorage } from '../../../storage/local.storage';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationActivate implements CanActivate {
  constructor(
    private service: AuthorizationService,
    private local: LocalStorage,
    private router: Router,
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    if (url) {
      try {
        let auth = this.local.auth.get();
        if (this.local.auth.check(auth)) {
          return true;
        }

        let signin = await this.service.signin(state.url);
        if (signin) {
          return true;
        }
      } catch (error) {
        return this.router.parseUrl(`/${RoutePath.login}`);
      }
    }
    return this.router.parseUrl(`/${RoutePath.login}`);
  }
}
