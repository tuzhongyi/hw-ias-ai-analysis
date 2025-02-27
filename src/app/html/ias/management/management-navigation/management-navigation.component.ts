import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ManagementNavigationBusiness } from './management-navigation.business';
import { ManagementNavigationItem } from './management-navigation.model';

@Component({
  selector: 'ias-management-navigation',
  imports: [CommonModule],
  templateUrl: './management-navigation.component.html',
  styleUrl: './management-navigation.component.less',
  providers: [ManagementNavigationBusiness],
})
export class ManagementNavigationComponent implements OnInit {
  constructor(
    private business: ManagementNavigationBusiness,
    private router: Router
  ) {}

  nodes: ManagementNavigationItem[] = [];

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  load() {
    this.nodes = this.business.load();
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.nodes = this.business.load();
    });
  }

  onpath(path: string) {
    this.router.navigateByUrl(path);
  }
}
