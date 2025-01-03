import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '../../../../common/storage/authorization/authorization.model';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { RoutePath } from '../../../app.route.path';

@Component({
  selector: 'ias-settings',
  imports: [DatePipe, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less',
})
export class SettingsComponent implements OnInit {
  constructor(private local: LocalStorage, private router: Router) {
    this.account = local.auth.get();
  }

  date = signal(Date.now());
  account?: AuthModel;
  menu = {
    account: false,
    question: false,
  };

  ngOnInit(): void {
    window.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      this.menu.account = false;
    });
    setInterval(() => {
      this.date.update((value) => Date.now());
    }, 1000);
  }

  onaccount(e: Event) {
    e.stopImmediatePropagation();
    this.menu.account = !this.menu.account;
  }
  onsignout(e: Event) {
    this.account = undefined;
    this.local.clear();
    e.stopImmediatePropagation();
    this.router.navigateByUrl(`${RoutePath.login}`);
  }
}
