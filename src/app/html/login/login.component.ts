import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../common/storage/login-info-storage/login-info.model';
import { LogoComponent } from '../ias/share/logo/logo.component';
import { LoginBusiness } from './login.business';

@Component({
  selector: 'ias-login',
  imports: [FormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.less',
    './less/login-head.less',
    './less/login-panel.less',
  ],
  providers: [LoginBusiness],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private business: LoginBusiness, private toastr: ToastrService) {}

  model = new LoginModel();
  remember = false;
  private handle: any;

  private get check() {
    if (!this.model.username) {
      return false;
    }
    if (!this.model.password) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.handle = this.onkeypress.bind(this);
    window.addEventListener('keypress', this.handle);
    this.load();
    this.business.init();
  }
  ngOnDestroy(): void {
    window.removeEventListener('keypress', this.handle);
  }

  onkeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onlogin();
    }
  }

  load() {
    let info = this.business.load();
    if (info) {
      this.model = info;
      this.remember = true;
    }
  }

  onlogin() {
    if (this.check) {
      this.business
        .login(this.model.username, this.model.password)
        .then(() => {
          if (this.remember) {
            this.business.remember(this.model.username, this.model.password);
          } else {
            this.business.forget();
          }
        })
        .catch((x) => {
          this.toastr.error('用户名或密码错误');
        });
    }
  }
}
