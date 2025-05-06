import { instanceToPlain } from 'class-transformer';
import { EventRecord } from '../../../../models/arm/event/event-record.model';
import { EventCapability } from '../../../../models/capabilities/arm/event/event-capability.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { GetEventsParams } from './system-event.params';

export class SystemEventRequestService {
  constructor(private http: HowellHttpClient) {}

  async get(id: string) {
    let url = ArmSystemUrl.event.item(id);
    return this.http.get<HowellResponse<EventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventRecord);
    });
  }
  async list(params: GetEventsParams) {
    let url = ArmSystemUrl.event.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<EventRecord>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, EventRecord);
      });
  }
  async all(params: GetEventsParams = new GetEventsParams()) {
    let data: EventRecord[] = [];
    let index = 1;
    let paged: PagedList<EventRecord>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  async handle(id: string, data: FormData) {
    let url = ArmSystemUrl.event.handle(id);
    return this.http
      .post<HowellResponse<EventRecord>, any>(url, data)
      .then((x) => {
        return HowellResponseProcess.item(x, EventRecord);
      });
  }

  async misinfo(id: string) {
    let url = ArmSystemUrl.event.misinfo(id);
    return this.http.post<HowellResponse<EventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventRecord);
    });
  }

  async assgin(id: string) {
    let url = ArmSystemUrl.event.assgin(id);
    return this.http.post<HowellResponse<EventRecord>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventRecord);
    });
  }

  async capability() {
    let url = ArmSystemUrl.event.capability();
    return this.http.get<HowellResponse<EventCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, EventCapability);
    });
  }
}
