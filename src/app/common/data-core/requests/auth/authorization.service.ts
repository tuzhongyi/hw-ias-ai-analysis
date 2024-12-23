import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocalStorage } from '../../../storage/local.storage';
import { HowellResponse } from '../../models/response';
import { ArmSystemUrl } from '../../urls/arm/system/system.url';
import { HowellSM4 } from './howell-sm4';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient, private local: LocalStorage) {}

  login(username: string, password: string) {
    let code = HowellSM4.encrypt(password);
    let path = ArmSystemUrl.security.login();
    return new Promise<boolean>((resolve, reject) => {
      firstValueFrom(
        this.http.post<HowellResponse<string>>(path, {
          Username: username,
          Password: code.toLocaleUpperCase(),
        })
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
}
