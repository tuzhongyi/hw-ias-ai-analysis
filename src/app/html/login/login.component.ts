import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../common/storage/authorization/authorization.model';
import { LogoComponent } from '../logo/logo.component';
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
  constructor(private business: LoginBusiness) {
    this.model.username = 'test01';
    this.model.password = 'howell_1409';
  }

  model = new LoginModel();

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
  }

  onlogin() {
    if (this.check) {
      this.business.login(this.model.username, this.model.password).catch();
    }
  }
}
