import { instanceToPlain } from 'class-transformer';

import { Cache } from '../../../../../cache/cache';
import { AbstractService } from '../../../../../cache/cache.interface';

import { ObjectTool } from '../../../../../../tools/object-tool/object.tool';
import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { RoadArea } from '../../../../../models/arm/geographic/road-area.model';
import { RoadAreaCapability } from '../../../../../models/capabilities/arm/geographic/road-area-capability.model';
import { PagedList } from '../../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import { GetRoadAreasParams } from './geographic-road-area.params';

@Cache(ArmGeographicUrl.road.area.basic(), RoadArea)
export class ArmGeographicRoadAreaRequestService extends AbstractService<RoadArea> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async get(id: string) {
    let url = ArmGeographicUrl.road.area.item(id);
    return this.http.get<HowellResponse<RoadArea>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadArea);
    });
  }

  async create(data: RoadArea) {
    let url = ArmGeographicUrl.road.area.basic();
    let _data = ObjectTool.serialize(data, RoadArea);
    let plain = instanceToPlain(_data);
    return this.http.post<HowellResponse<RoadArea>, any>(url, plain).then((x) => {
      return HowellResponseProcess.item(x, RoadArea);
    });
  }

  async update(data: RoadArea) {
    let url = ArmGeographicUrl.road.area.item(data.Id);
    let _data = ObjectTool.serialize(data, RoadArea);
    let plain = instanceToPlain(_data);
    return this.http
      .put<any, HowellResponse<RoadArea>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadArea);
      });
  }
  async delete(id: string) {
    let url = ArmGeographicUrl.road.area.item(id);
    return this.http.delete<HowellResponse<RoadArea>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadArea);
    });
  }

  async list(params: GetRoadAreasParams): Promise<PagedList<RoadArea>> {
    let url = ArmGeographicUrl.road.area.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<RoadArea>>, any>(url, plain)
      .then((x) => {
        let paged = HowellResponseProcess.paged(x, RoadArea);
        if (paged.Page.PageCount > 0 && paged.Page.PageIndex > paged.Page.PageCount) {
          params.PageIndex = paged.Page.PageCount;
          return this.list(params);
        }
        return paged;
      });
  }
  async all(params: GetRoadAreasParams = new GetRoadAreasParams()) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async capability() {
    let url = ArmGeographicUrl.road.area.capability();
    return this.http.get<HowellResponse<RoadAreaCapability>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadAreaCapability);
    });
  }
}
