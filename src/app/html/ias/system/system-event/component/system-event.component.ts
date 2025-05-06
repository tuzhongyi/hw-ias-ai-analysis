import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';
import { SystemEventBusiness } from './system-event.business';

@Component({
  selector: 'ias-system-event',
  imports: [RouterOutlet, ContentHeaderComponent],
  templateUrl: './system-event.component.html',
  styleUrl: './system-event.component.less',
  providers: [SystemEventBusiness],
})
export class SystemEventComponent implements OnInit {
  @Input() title: string = '';

  constructor(private business: SystemEventBusiness, private router: Router) {}

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
