import { Injectable } from '@angular/core';
import { HowellResponse } from '../../../models/response';
import { ArmMediumUrl } from '../../../urls/arm/medium/medium.url';
import { HowellHttpClient } from '../../howell-http.client';

@Injectable({
  providedIn: 'root',
})
export class MediumRequestService {
  constructor(private http: HowellHttpClient) {}

  picture(id: string) {
    return ArmMediumUrl.picture.get(id);
  }

  upload(data: BinaryData) {
    let url = ArmMediumUrl.picture.upload();
    return this.http
      .post<HowellResponse<string>, BinaryData>(url, data)
      .then((x) => {
        return x.Data;
      });
  }

  copy(id: string) {
    return new Promise<string>((resolve, reject) => {
      let url = this.picture(id);
      let http = new XMLHttpRequest();
      http.onload = () => {
        if (http.status === 200) {
          this.upload(http.response)
            .then((x) => {
              resolve(x);
            })
            .catch((x) => {
              reject(x);
            });
        } else {
          reject(http.status);
        }
      };
      http.open('GET', url);
      http.responseType = 'arraybuffer';
      http.send();
    });
  }
}
