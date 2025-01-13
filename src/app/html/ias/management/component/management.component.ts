import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { RoutePath } from '../../../app.route.path';

@Component({
  selector: 'ias-management',
  imports: [],
  templateUrl: './management.component.html',
  styleUrl: './management.component.less',
})
export class ManagementComponent implements OnInit, OnDestroy {
  constructor(
    private local: LocalStorage,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  src?: SafeResourceUrl;
  handle: any;

  ngOnInit(): void {
    this.open();
    this.regist();
  }
  ngOnDestroy(): void {
    if (this.handle) {
      window.removeEventListener('message', this.handle);
      this.handle = undefined;
    }
  }

  open() {
    let _ = '';
    let port = location.port;
    if (port) {
      _ = ':';
    }
    let url = `http://${location.hostname}${_}${port}/main/main.html`;
    if (location.hostname === '127.0.0.1' && port === '9000') {
      url = `http://192.168.18.147/main/main.html`;
    }
    let auth = this.local.auth.get();
    let src = `${url}?username=${auth.username}&token=${auth.token}`;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  regist() {
    this.handle = this.onlogout.bind(this);
    window.addEventListener('message', this.handle);
  }

  onlogout(e: MessageEvent) {
    if (e.data === 'logout') {
      this.local.clear();
      this.router.navigateByUrl(RoutePath.login);
    }
  }
}
