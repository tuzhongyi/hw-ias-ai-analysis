import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ContentHeaderComponent } from '../../../share/header/content-header/content-header.component';
import { SystemModuleBusiness } from './system-module.business';

@Component({
  selector: 'ias-system-module',
  imports: [RouterOutlet, ContentHeaderComponent],
  templateUrl: './system-module.component.html',
  styleUrl: './system-module.component.less',
  providers: [SystemModuleBusiness],
})
export class SystemModuleComponent implements OnInit {
  @Input() title: string = '';

  constructor(private business: SystemModuleBusiness, private router: Router) {}

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
