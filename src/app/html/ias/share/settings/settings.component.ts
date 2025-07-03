import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(private local: LocalStorage, private router: Router) {
    this.account = local.auth.get();
  }

  date = signal(Date.now());
  account?: AuthModel;
  menu = {
    account: false,
    question: false,
  };
  handle: {
    date?: any;
    close?: any;
  } = {};

  ngOnInit(): void {
    this.handle.close = this.on.account.close.bind(this);
    window.addEventListener('click', this.handle.close);
    this.handle.date = setInterval(() => {
      this.date.set(Date.now());
    }, 1000);
  }
  ngOnDestroy(): void {
    if (this.handle.date) {
      clearInterval(this.handle.date);
      this.handle.date = undefined;
    }
    if (this.handle.close) {
      window.removeEventListener('click', this.handle.close);
      this.handle.close = undefined;
    }
  }

  on = {
    account: {
      click: (e: Event) => {
        e.stopImmediatePropagation();
        this.menu.account = !this.menu.account;
      },
      close: (e: Event) => {
        e.stopImmediatePropagation();
        this.menu.account = false;
      },
    },
    sign: {
      out: (e: Event) => {
        this.account = undefined;
        this.local.clear();
        this.local.login.clear();
        e.stopImmediatePropagation();
        this.router.navigateByUrl(`${RoutePath.login}`);
      },
    },
    help: () => {
      window.open('/help/help.html');
    },
  };
}
