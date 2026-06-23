import { instanceToPlain } from 'class-transformer';
import { VideoUrl } from '../../../../../models/arm/mobile-device/video-url.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmSystemUrl } from '../../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
  PreviewParams,
  VodParams,
} from '../system-mobile-device.params';

export class SystemMobileDeviceVideoRequestService {
  constructor(private http: HowellHttpClient) {}

  preview = {
    url: (params: GetPreviewUrlParams) => {
      let url = ArmSystemUrl.mobile.device.preview.url();
      let plain = instanceToPlain(params);
      return this.http
        .post<HowellResponse<VideoUrl>, any>(url, plain)
        .then((x) => {
          return HowellResponseProcess.item(x, VideoUrl);
        });
    },
    start: (params: PreviewParams) => {
      let url = ArmSystemUrl.mobile.device.preview.start();
      let plain = instanceToPlain(params);
      return this.http.post<HowellResponse<string>, any>(url, plain);
    },
    stop: (params: PreviewParams) => {
      let url = ArmSystemUrl.mobile.device.preview.stop();
      let plain = instanceToPlain(params);
      return this.http.post<HowellResponse<string>, any>(url, plain);
    },
  };
  vod = {
    url: (params: GetVodUrlParams) => {
      let url = ArmSystemUrl.mobile.device.vod.url();
      let plain = instanceToPlain(params);
      return this.http
        .post<HowellResponse<VideoUrl>, any>(url, plain)
        .then((x) => {
          return HowellResponseProcess.item(x, VideoUrl);
        });
    },
    start: (params: VodParams) => {
      let url = ArmSystemUrl.mobile.device.vod.start();
      let plain = instanceToPlain(params);
      return this.http.post<HowellResponse<string>, any>(url, plain);
    },
    stop: (params: VodParams) => {
      let url = ArmSystemUrl.mobile.device.vod.stop();
      let plain = instanceToPlain(params);
      return this.http.post<HowellResponse<string>, any>(url, plain);
    },
  };
}
