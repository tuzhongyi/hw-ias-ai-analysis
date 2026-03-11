import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';
import { SystemStatisticBusiness } from './system-statistic.business';

@Component({
  selector: 'ias-system-statistic',
  imports: [RouterOutlet, ContentHeaderComponent],
  templateUrl: './system-statistic.component.html',
  styleUrl: './system-statistic.component.less',
  providers: [SystemStatisticBusiness],
})
export class SystemStatisticComponent implements OnInit {
  @Input() title: string = '';

  constructor(
    private business: SystemStatisticBusiness,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regist();
    this.title = this.business.load();
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.title = this.business.load();
    });
  }
}
