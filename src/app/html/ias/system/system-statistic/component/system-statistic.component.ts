import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription, filter } from 'rxjs';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';
import { SystemStatisticBusiness } from './system-statistic.business';

@Component({
  selector: 'ias-system-statistic',
  imports: [RouterOutlet, CommonModule, ContentHeaderComponent],
  templateUrl: './system-statistic.component.html',
  styleUrl: './system-statistic.component.less',
  providers: [SystemStatisticBusiness],
})
export class SystemStatisticComponent implements OnInit, OnDestroy {
  @Input() title: string = '';

  constructor(
    private business: SystemStatisticBusiness,
    private router: Router
  ) {}

  head = true;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.title = this.business.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    let sub1 = this.business.headable.subscribe((x) => {
      this.head = x;
    });
    this.subscription.add(sub1);
    let sub2 = (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.title = this.business.load();
    });
    this.subscription.add(sub2);
  }
}
