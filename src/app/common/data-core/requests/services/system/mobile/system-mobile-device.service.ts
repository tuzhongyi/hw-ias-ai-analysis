import { instanceToPlain } from 'class-transformer';
import { UploadControlFile } from '../../../../../components/upload-control/upload-control.model';
import { Cache } from '../../../../cache/cache';
import { AbstractService } from '../../../../cache/cache.interface';
import { EventUploadContent } from '../../../../models/arm/event/event-upload-content.model';
import { MobileDevice } from '../../../../models/arm/mobile-device/mobile-device.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { SystemMobileDeviceRouteRequestService } from './route/system-mobile-device-route.service';
import { GetMobileDevicesParams } from './system-mobile-device.params';

@Cache(ArmSystemUrl.mobile.device.basic(), MobileDevice)
export class SystemMobileDeviceRequestService extends AbstractService<MobileDevice> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  event = {
    upload: (key: string) => {
      let url = ArmSystemUrl.mobile.device.event.upload(key);
    },
  };
  convert = {
    content: (content: EventUploadContent) => {
      let plain = instanceToPlain(content);
      let str = JSON.stringify(plain);
      let blob = new Blob([str], { type: 'text/plain' });
      return blob;
    },
    audio: (data: UploadControlFile) => {},
  };

  async create(data: MobileDevice) {
    let url = ArmSystemUrl.mobile.device.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<MobileDevice>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, MobileDevice);
      });
  }
  async get(id: string) {
    let url = ArmSystemUrl.mobile.device.item(id);
    return this.http.get<HowellResponse<MobileDevice>>(url).then((x) => {
      return HowellResponseProcess.item(x, MobileDevice);
    });
  }
  async delete(id: string) {
    let url = ArmSystemUrl.mobile.device.item(id);
    return this.http.delete<HowellResponse<MobileDevice>>(url).then((x) => {
      return HowellResponseProcess.item(x, MobileDevice);
    });
  }

  async update(data: MobileDevice) {
    let url = ArmSystemUrl.mobile.device.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<MobileDevice>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, MobileDevice);
      });
  }

  async list(params: GetMobileDevicesParams) {
    let url = ArmSystemUrl.mobile.device.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<MobileDevice>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, MobileDevice);
      });
  }
  async all(params: GetMobileDevicesParams = new GetMobileDevicesParams()) {
    let data: MobileDevice[] = [];
    let index = 1;
    let paged: PagedList<MobileDevice>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  excel = {
    upload: async (
      data: ArrayBuffer,
      progress?: (x: number) => void,
      completed?: () => void
    ) => {
      let url = ArmSystemUrl.mobile.device.excel();
      this.http
        .upload<ArrayBuffer, HowellResponse<string>>(url, data, {
          process: progress,
          completed: completed,
        })
        .then((x) => {
          if (x.FaultCode === 0) {
            return x.Data;
          }
          throw new Error(`${x.FaultCode}:${x.FaultReason}`);
        });
    },
  };

  private _route?: SystemMobileDeviceRouteRequestService;
  public get route(): SystemMobileDeviceRouteRequestService {
    if (!this._route) {
      this._route = new SystemMobileDeviceRouteRequestService(this.http);
    }
    return this._route;
  }
}
