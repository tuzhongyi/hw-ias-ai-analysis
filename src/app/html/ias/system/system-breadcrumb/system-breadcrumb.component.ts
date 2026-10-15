import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GlobalStorage } from '../../../../common/storage/global.storage';
import { SystemBreadcrumbBusiness } from './system-breadcrumb.business';
import { SystemBreadcrumbModel } from './system-breadcrumb.model';

@Component({
  selector: 'ias-system-breadcrumb',
  imports: [CommonModule],
  templateUrl: './system-breadcrumb.component.html',
  styleUrl: './system-breadcrumb.component.less',
  providers: [SystemBreadcrumbBusiness],
})
export class SystemBreadcrumbComponent implements OnInit {
  constructor(
    private business: SystemBreadcrumbBusiness,
    private router: Router,
    private global: GlobalStorage
  ) {}

  // system.component.html 把 <ias-system-head> 包在 *ngIf 里，hidetitlebar 会真的
  // 销毁重建本组件，所以订阅必须跟着组件销毁
  private destroyRef = inject(DestroyRef);

  model = new SystemBreadcrumbModel();

  ngOnInit(): void {
    this.regist();
    this.model.items = this.business.load(
      this.router.routerState.snapshot.root
    );
  }

  private regist() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.model.items = this.business.load(
          this.router.routerState.snapshot.root
        );
      });
  }

  onpath(path: string) {
    if (this.global.uploading) {
      if (confirm('当前有文件正在上传，是否继续？')) {
        this.router.navigateByUrl(path);
      }
    } else {
      this.router.navigateByUrl(path);
    }
  }
}
