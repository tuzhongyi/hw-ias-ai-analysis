import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocalStorage } from '../../../storage/local.storage';
import { Base64 } from '../../../tools/base64/base64.tool';
import { HowellResponse } from '../../models/response';
import { ArmSystemUrl } from '../../urls/arm/system/system.url';
import { HowellSM4 } from './howell-sm4';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private local: LocalStorage,
  ) {}

  login(username: string, password: string) {
    let path = ArmSystemUrl.security.login();
    return new Promise<boolean>((resolve, reject) => {
      firstValueFrom(
        this.http.post<HowellResponse<string>>(path, {
          Username: username,
          Password: password.toLocaleUpperCase(),
        }),
      )
        .then((res) => {
          if (res.FaultCode === 0) {
            this.local.auth.set({
              username: username,
              token: res.Data,
            });
            resolve(true);
          } else {
            this.local.auth.clear();
            reject(res);
          }
        })
        .catch((e) => {
          reject(e.status);
        });
    });
  }

  async signin(url: string) {
    let params = new URL(`http://0.0.0.0${url}`).searchParams;

    let auth = params.get('auth');

    if (auth) {
      let encode = decodeURIComponent(auth);

      let urlParam = Base64.decode(encode);
      let paramSplit = urlParam.split('&');
      let username = paramSplit[0];
      let password = paramSplit[1];
      let code = HowellSM4.encrypt(password);
      return this.login(username, code);
    }

    return false;
  }
}
