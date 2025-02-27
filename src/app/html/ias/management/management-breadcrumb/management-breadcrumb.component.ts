import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';

import { ManagementBreadcrumbBusiness } from './management-breadcrumb.business';
import { ManagementBreadcrumbItem } from './management-breadcrumb.model';

@Component({
  selector: 'ias-management-breadcrumb',
  imports: [CommonModule],
  templateUrl: './management-breadcrumb.component.html',
  styleUrl: './management-breadcrumb.component.less',
  providers: [ManagementBreadcrumbBusiness],
})
export class ManagementBreadcrumbComponent implements OnInit {
  constructor(
    private business: ManagementBreadcrumbBusiness,
    private router: Router
  ) {}

  items: ManagementBreadcrumbItem[] = [];

  ngOnInit(): void {
    this.regist();
    this.items = this.business.load();
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.items = this.business.load();
    });
  }

  onpath(path: string) {
    this.router.navigateByUrl(path);
  }
}
