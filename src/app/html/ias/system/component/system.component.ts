import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalStorage } from '../../../../common/storage/global.storage';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { RoutePath } from '../../../app.route.path';
import { SystemHeadComponent } from '../system-head/system-head.component';

@Component({
  selector: 'ias-system',
  imports: [RouterOutlet, SystemHeadComponent],
  templateUrl: './system.component.html',
  styleUrl: './system.component.less',
})
export class SystemComponent implements OnInit, OnDestroy {
  constructor(
    private local: LocalStorage,
    private router: Router,
    private global: GlobalStorage
  ) {}

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  private regist() {
    let sub = this.global.unload.subscribe((x) => {
      this.local.unload.set(new Date());
    });
    this.subscription.add(sub);
  }
  private load() {
    let now = new Date();
    let unload = this.local.unload.get();
    console.log('unload:', unload);
    if (unload) {
      let time = now.getTime() - unload.getTime();
      console.log('time:', time);
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
