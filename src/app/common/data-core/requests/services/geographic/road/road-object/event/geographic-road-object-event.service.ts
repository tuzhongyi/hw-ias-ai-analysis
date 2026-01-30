import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../../../../tools/service-tool/service.tool';
import { RoadObjectEventRecord } from '../../../../../../models/arm/geographic/road-object-event-record.model';
import { PagedList } from '../../../../../../models/page-list.model';
import { HowellResponse } from '../../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../../service-process';
import {
  GetRoadObjectEventsParams,
  RoadObjectEventConfirmation,
} from './geographic-road-object-event.params';

export class ArmGeographicRoadObjectEventRequestService {
  constructor(private http: HowellHttpClient) {}

  all(params: GetRoadObjectEventsParams): Promise<RoadObjectEventRecord[]> {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async get(id: string) {
    let url = ArmGeographicUrl.road.object.item(id);
    return this.http
      .get<HowellResponse<RoadObjectEventRecord>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObjectEventRecord);
      });
  }

  async list(params: GetRoadObjectEventsParams) {
    let url = ArmGeographicUrl.road.object.event().list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<RoadObjectEventRecord>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, RoadObjectEventRecord);
      });
  }

  confirmed(params: RoadObjectEventConfirmation) {
    let url = ArmGeographicUrl.road.object.event().confirmed(params.Id);
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<RoadObjectEventRecord>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObjectEventRecord);
      });
  }
}
