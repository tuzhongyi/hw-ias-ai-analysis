import { instanceToPlain } from 'class-transformer';
import { MobileEventRecord } from '../../../../models/arm/event/mobile-event-record.model';
import { FileGpsItem } from '../../../../models/arm/file/file-gps-item.model';
import { EventCapability } from '../../../../models/capabilities/arm/event/event-capability.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { SystemEventHandleRequestService } from './handle/system-event-handle.service';
import { SystemEventNumberRequestService } from './number/system-event-number.service';
import {
  GetMobileEventFileGpsItemsParams,
  GetMobileEventFileParams,
  GetMobileEventsParams,
} from './system-event.params';

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
  private _number?: SystemEventNumberRequestService;
  public get number(): SystemEventNumberRequestService {
    if (!this._number) {
      this._number = new SystemEventNumberRequestService(this.http);
    }
    return this._number;
  }

  record = {
    file: (id: string, params: GetMobileEventFileParams) => {
      return ArmSystemUrl.event.record.file(id, params);
    },
  };
  gps = {
    items: (id: string, params: GetMobileEventFileGpsItemsParams) => {
      let url = ArmSystemUrl.event.gps.items(id, params);
      return this.http.get<HowellResponse<FileGpsItem[]>>(url).then((x) => {
        return HowellResponseProcess.array(x, FileGpsItem);
      });
    },
  };
}
