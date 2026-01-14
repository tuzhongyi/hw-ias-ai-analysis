import { instanceToPlain } from 'class-transformer';

import { Cache } from '../../../../../cache/cache';
import { AbstractService } from '../../../../../cache/cache.interface';

import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { RoadObject } from '../../../../../models/arm/geographic/road-object.model';
import { RoadObjectCapability } from '../../../../../models/capabilities/arm/geographic/road-object-capability.model';
import { PagedList } from '../../../../../models/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import { ArmGeographicRoadObjectEventRequestService } from './event/geographic-road-object-event.service';
import { GetRoadObjectsParams } from './geographic-road-object.params';

@Cache(ArmGeographicUrl.road.object.basic(), RoadObject)
export class ArmGeographicRoadObjectRequestService extends AbstractService<RoadObject> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async get(id: string) {
    let url = ArmGeographicUrl.road.object.item(id);
    return this.http.get<HowellResponse<RoadObject>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadObject);
    });
  }

  async create(data: RoadObject) {
    let url = ArmGeographicUrl.road.object.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<RoadObject>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObject);
      });
  }

  async update(data: RoadObject) {
    let url = ArmGeographicUrl.road.object.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<RoadObject>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObject);
      });
  }
  async delete(id: string) {
    let url = ArmGeographicUrl.road.object.item(id);
    return this.http.delete<HowellResponse<RoadObject>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadObject);
    });
  }

  async list(params: GetRoadObjectsParams) {
    let url = ArmGeographicUrl.road.object.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<RoadObject>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, RoadObject);
      });
  }
  async all(params: GetRoadObjectsParams = new GetRoadObjectsParams()) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async capability() {
    let url = ArmGeographicUrl.road.object.capability();
    return this.http
      .get<HowellResponse<RoadObjectCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadObjectCapability);
      });
  }

  private _event?: ArmGeographicRoadObjectEventRequestService;
  public get event(): ArmGeographicRoadObjectEventRequestService {
    if (!this._event) {
      this._event = new ArmGeographicRoadObjectEventRequestService(this.http);
    }
    return this._event;
  }
}
