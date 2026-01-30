import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigRequestService } from '../../../../common/data-core/requests/services/config/config.service';
import { GlobalStorage } from '../../../../common/storage/global.storage';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { wait } from '../../../../common/tools/wait';
import { RoutePath } from '../../../app.route.path';
import { SystemHeadComponent } from '../system-head/system-head.component';
import { SystemBusiness } from './system.business';

@Component({
  selector: 'ias-system',
  imports: [RouterOutlet, SystemHeadComponent],
  templateUrl: './system.component.html',
  styleUrl: './system.component.less',
  providers: [SystemBusiness],
})
export class SystemComponent implements OnInit, OnDestroy {
  constructor(
    private local: LocalStorage,
    private router: Router,
    private global: GlobalStorage,
    private config: ConfigRequestService,
    private business: SystemBusiness
  ) {}

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
    this.init();
  }

  private init() {
    this.global.display.loading = true;
    this.business.get().then((user) => {
      if (user) {
        let shop = false;
        if (user.Priorities) {
          shop = user.Priorities.includes('1');
        }

        if (shop) {
          this.global.display.task.shop = true;
          this.global.display.task.gps = true;

          this.global.display.module.shop = true;
          this.global.display.module.road = true;
          this.global.display.module.route = true;
          this.global.display.module.roadobject = true;

          this.global.display.record.shop = true;
          this.global.display.record.realtime = true;
          this.global.display.record.gps = true;
          this.global.display.record.roadobject = true;

          this.global.display.map.shop = true;
          this.global.display.map.realtime = true;
          this.global.display.map.gpstask = true;
          this.global.display.map.roadobject = true;
        } else {
          this.global.display.task.shop = false;
          this.global.display.task.gps = true;

          this.global.display.module.shop = false;
          this.global.display.module.road = true;
          this.global.display.module.route = true;
          this.global.display.module.roadobject = true;

          this.global.display.record.shop = false;
          this.global.display.record.realtime = true;
          this.global.display.record.gps = true;
          this.global.display.record.roadobject = true;

          this.global.display.map.shop = false;
          this.global.display.map.realtime = true;
          this.global.display.map.gpstask = true;
          this.global.display.map.roadobject = true;
        }
      }
      this.global.display.loading = false;
    });
  }

  private regist() {
    let sub = this.global.unload.subscribe((x) => {
      this.local.unload.set(new Date());
    });
    this.subscription.add(sub);

    wait(
      () => {
        this.config.version.then((version) => {
          if (this.global.version !== version) {
            location.replace(window.location.href);
          }
        });
        return false;
      },
      { interval: 60 * 1000 }
    );
  }
  private load() {
    let now = new Date();
    let unload = this.local.unload.get();

    if (unload) {
      let time = now.getTime() - unload.getTime();
      if (time > 1000 * 60 * 1) {
        this.local.clear();
        this.router.navigateByUrl(`${RoutePath.login}`);
      } else {
        this.local.unload.clear();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
