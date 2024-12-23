import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../common/data-core/requests/auth/authorization.service';
import { RoutePath } from '../app.route.path';

@Injectable()
export class LoginBusiness {
  constructor(private service: AuthorizationService, private router: Router) {}

  login(username: string, passoword: string) {
    return this.service.login(username, passoword).then((x) => {
      if (username === 'root') {
        this.router.navigateByUrl(`${RoutePath.management}`);
      } else {
        this.router.navigateByUrl(`${RoutePath.system}`);
      }
    });
  }
}
