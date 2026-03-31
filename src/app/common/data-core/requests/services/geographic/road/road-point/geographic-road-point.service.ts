import { instanceToPlain } from 'class-transformer';

import { AbstractService } from '../../../../../cache/cache.interface';

import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';

import { RoadPoint } from '../../../../../models/arm/geographic/road-point.model';
import { RoadPointCapability } from '../../../../../models/capabilities/arm/geographic/road-point-capability.model';
import { PagedList } from '../../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import { GetRoadPointsParams } from './geographic-road-point.params';

export class ArmGeographicRoadPointRequestService extends AbstractService<RoadPoint> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async get(id: string) {
    let url = ArmGeographicUrl.road.point.item(id);
    return this.http.get<HowellResponse<RoadPoint>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadPoint);
    });
  }

  async create(data: RoadPoint) {
    let url = ArmGeographicUrl.road.point.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<RoadPoint>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadPoint);
      });
  }

  async update(data: RoadPoint) {
    let url = ArmGeographicUrl.road.point.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<RoadPoint>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadPoint);
      });
  }
  async delete(id: string) {
    let url = ArmGeographicUrl.road.point.item(id);
    return this.http.delete<HowellResponse<RoadPoint>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadPoint);
    });
  }

  async list(params: GetRoadPointsParams) {
    let url = ArmGeographicUrl.road.point.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<RoadPoint>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, RoadPoint);
      });
  }
  async all(params: GetRoadPointsParams = new GetRoadPointsParams()) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async capability() {
    let url = ArmGeographicUrl.road.point.capability();
    return this.http.get<HowellResponse<RoadPointCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadPointCapability);
    });
  }
}
