import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SystemTaskBusiness } from './system-task.business';

@Component({
  selector: 'ias-system-task',
  imports: [RouterOutlet, ContentHeaderComponent],
  templateUrl: './system-task.component.html',
  styleUrl: './system-task.component.less',
  providers: [SystemTaskBusiness],
})
export class SystemTaskComponent implements OnInit {
  @Input() title: string = '';

  constructor(private business: SystemTaskBusiness, private router: Router) {}

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
