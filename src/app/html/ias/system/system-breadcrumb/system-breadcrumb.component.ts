import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { GlobalStorage } from '../../../../common/storage/global.storage';
import { SystemPath } from '../system.model';
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

  model = new SystemBreadcrumbModel();

  ngOnInit(): void {
    this.regist();
    this.model.items = this.business.load();
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.model.items = this.business.load();
    });
  }

  onpath(path: SystemPath) {
    if (this.global.uploading) {
      if (confirm('当前有文件正在上传，是否继续？')) {
        this.router.navigateByUrl(path);
      }
    } else {
      this.router.navigateByUrl(path);
    }
  }
}
