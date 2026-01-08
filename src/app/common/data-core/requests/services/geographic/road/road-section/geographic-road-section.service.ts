import { instanceToPlain } from 'class-transformer';

import { Cache } from '../../../../../cache/cache';
import { AbstractService } from '../../../../../cache/cache.interface';

import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { RoadSection } from '../../../../../models/arm/geographic/road-section.model';
import { RoadSectionCapability } from '../../../../../models/capabilities/arm/geographic/road-section-capability.model';
import { PagedList } from '../../../../../models/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import { GetRoadSectionsParams } from './geographic-road-section.params';

@Cache(ArmGeographicUrl.road.section.basic(), RoadSection)
export class ArmGeographicRoadSectionRequestService extends AbstractService<RoadSection> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async get(id: string) {
    let url = ArmGeographicUrl.road.section.item(id);
    return this.http.get<HowellResponse<RoadSection>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadSection);
    });
  }

  async create(data: RoadSection) {
    let url = ArmGeographicUrl.road.section.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<RoadSection>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadSection);
      });
  }

  async update(data: RoadSection) {
    let url = ArmGeographicUrl.road.section.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<RoadSection>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadSection);
      });
  }
  async delete(id: string) {
    let url = ArmGeographicUrl.road.section.item(id);
    return this.http.delete<HowellResponse<RoadSection>>(url).then((x) => {
      return HowellResponseProcess.item(x, RoadSection);
    });
  }

  async list(params: GetRoadSectionsParams) {
    let url = ArmGeographicUrl.road.section.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<RoadSection>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, RoadSection);
      });
  }
  async all(params: GetRoadSectionsParams = new GetRoadSectionsParams()) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async capability() {
    let url = ArmGeographicUrl.road.section.capability();
    return this.http
      .get<HowellResponse<RoadSectionCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, RoadSectionCapability);
      });
  }
}
