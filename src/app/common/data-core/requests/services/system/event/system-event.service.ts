import { instanceToPlain } from 'class-transformer';
import { MobileEventRecord } from '../../../../models/arm/event/mobile-event-record.model';
import { EventCapability } from '../../../../models/capabilities/arm/event/event-capability.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { SystemEventHandleRequestService } from './handle/system-event-handle.service';
import { GetMobileEventsParams } from './system-event.params';

export class SystemEventRequestService {
  constructor(private http: HowellHttpClient) {}

  async get(id: string) {
    let url = ArmSystemUrl.event.item(id);
    return this.http.get<HowellResponse<MobileEventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, MobileEventRecord);
    });
  }
  async list(params: GetMobileEventsParams) {
    let url = ArmSystemUrl.event.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<MobileEventRecord>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, MobileEventRecord);
      });
  }
  async all(params: GetMobileEventsParams = new GetMobileEventsParams()) {
    let data: MobileEventRecord[] = [];
    let index = 1;
    let paged: PagedList<MobileEventRecord>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  async misinfo(id: string) {
    let url = ArmSystemUrl.event.misinfo(id);
    return this.http.post<HowellResponse<MobileEventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, MobileEventRecord);
    });
  }

  async assgin(id: string) {
    let url = ArmSystemUrl.event.assgin(id);
    return this.http.post<HowellResponse<MobileEventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, MobileEventRecord);
    });
  }

  async capability() {
    let url = ArmSystemUrl.event.capability();
    return this.http.get<HowellResponse<EventCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventCapability);
    });
  }

  private _handle?: SystemEventHandleRequestService;
  public get handle(): SystemEventHandleRequestService {
    if (!this._handle) {
      this._handle = new SystemEventHandleRequestService(this.http);
    }
    return this._handle;
  }
}
