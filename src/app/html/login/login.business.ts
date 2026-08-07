import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../common/data-core/requests/auth/authorization.service';
import { HowellSM4 } from '../../common/data-core/requests/auth/howell-sm4';
import { ArmAnalysisRequestService } from '../../common/data-core/requests/services/analysis/analysis.service';
import { ArmDivisionRequestService } from '../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../common/data-core/requests/services/geographic/geographic.service';
import { ArmSystemRequestService } from '../../common/data-core/requests/services/system/system.service';
import { LocalStorage } from '../../common/storage/local.storage';
import { ScreenDetectorService } from '../../common/services/screen-detector.service';
import { ScreenType } from '../../common/services/screen-type';
import { RoutePath } from '../app.route.path';

@Injectable()
export class LoginBusiness {
  constructor(
    private service: AuthorizationService,
    private router: Router,
    private local: LocalStorage,
    private analysis: ArmAnalysisRequestService,
    private geo: ArmGeographicRequestService,
    private system: ArmSystemRequestService,
    private division: ArmDivisionRequestService,
  ) {}

  init() {
    this.local.clear();
    this.clear();
  }

  private clear() {
    this.local.unload.clear();
    this.geo.shop.cache.clear();
    this.geo.road.cache.clear();
    this.analysis.server.task.cache.clear();
    this.division.cache.clear();
    this.system.mobile.device.cache.clear();
  }

  login(username: string, password: string) {
    let code = HowellSM4.encrypt(password);
    return this.service.login(username, code).then((x) => {
      this.clear();
      const screen = ScreenDetectorService.detect();
      // default 不显示参数，无 ?screen= 即默认
      const extras = screen !== ScreenType.normal ? { queryParams: { screen } } : undefined;
      if (username === 'root') {
        this.router.navigate([RoutePath.management], extras);
      } else {
        this.system.security.user
          .get(username)
          .then((user) => {
            let segments: string[] = [RoutePath.system];
            if (
              user.Priorities &&
              user.Priorities.length > 0 &&
              user.Priorities.includes('1')
            ) {
              // 有完整权限 → /system
            } else {
              segments.push('map');
            }
            this.router.navigate(segments, extras);
          })
          .catch((e) => {
            this.router.navigate([RoutePath.system], extras);
          });
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
