import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
export class LoginComponent implements OnInit {
  constructor(private business: LoginBusiness) {}

  model = new LoginModel();
  remember = false;

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
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.onlogin();
      }
    });
    this.load();
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
        .catch(() => {
          if (this.remember) {
            this.business.remember(this.model.username, this.model.password);
          }
        });
    }
  }
}
