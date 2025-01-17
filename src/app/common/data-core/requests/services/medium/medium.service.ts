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
}
