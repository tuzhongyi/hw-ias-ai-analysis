import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../common/data-core/requests/auth/authorization.service';
import { HowellSM4 } from '../../common/data-core/requests/auth/howell-sm4';
import { ArmAnalysisRequestService } from '../../common/data-core/requests/services/analysis/analysis.service';
import { ArmGeographicRequestService } from '../../common/data-core/requests/services/geographic/geographic.service';
import { LocalStorage } from '../../common/storage/local.storage';
import { RoutePath } from '../app.route.path';

@Injectable()
export class LoginBusiness {
  constructor(
    private service: AuthorizationService,
    private router: Router,
    private local: LocalStorage,
    private analysis: ArmAnalysisRequestService,
    private geo: ArmGeographicRequestService
  ) {}

  init() {
    this.local.clear();
  }

  clear() {
    this.local.unload.clear();
    this.geo.shop.cache.clear();
    this.geo.road.cache.clear();
    this.analysis.server.task.cache.clear();
  }

  login(username: string, password: string) {
    let code = HowellSM4.encrypt(password);
    return this.service.login(username, code).then((x) => {
      this.clear();
      if (username === 'root') {
        this.router.navigateByUrl(`${RoutePath.management}`);
      } else {
        this.router.navigateByUrl(`${RoutePath.system}`);
      }
    });
  }

  remember(username: string, password: string) {
    let info = { username, password };
    info.password = HowellSM4.encrypt(password);
    this.local.login.set(info);
  }
  forget() {
    this.local.login.clear();
  }

  load() {
    let info = this.local.login.get();
    if (!info) {
      return undefined;
    }
    info.password = HowellSM4.decrypt(info.password);
    return info;
  }
}
