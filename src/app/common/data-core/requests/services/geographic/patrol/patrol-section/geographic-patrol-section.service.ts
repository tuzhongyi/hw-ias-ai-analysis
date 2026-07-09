import { instanceToPlain } from 'class-transformer';

import { ObjectTool } from '../../../../../../tools/object-tool/object.tool';
import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { Cache } from '../../../../../cache/cache';
import { AbstractService } from '../../../../../cache/cache.interface';
import { PatrolSection } from '../../../../../models/arm/geographic/patrol/patrol-section.model';
import { PagedList } from '../../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import { GetPatrolSectionsParams } from './geographic-patrol-section.params';

@Cache(ArmGeographicUrl.patrol.section.basic(), PatrolSection)
export class ArmGeographicPatrolSectionRequestService extends AbstractService<PatrolSection> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async get(id: string) {
    let url = ArmGeographicUrl.patrol.section.item(id);
    return this.http.get<HowellResponse<PatrolSection>>(url).then((x) => {
      return HowellResponseProcess.item(x, PatrolSection);
    });
  }

  async create(data: PatrolSection) {
    let url = ArmGeographicUrl.patrol.section.basic();
    let _data = ObjectTool.serialize(data, PatrolSection);
    let plain = instanceToPlain(_data);
    return this.http
      .post<HowellResponse<PatrolSection>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, PatrolSection);
      });
  }

  async update(data: PatrolSection) {
    let url = ArmGeographicUrl.patrol.section.item(data.Id);
    let _data = ObjectTool.serialize(data, PatrolSection);
    let plain = instanceToPlain(_data);
    return this.http
      .put<any, HowellResponse<PatrolSection>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, PatrolSection);
      });
  }

  async delete(id: string) {
    let url = ArmGeographicUrl.patrol.section.item(id);
    return this.http.delete<HowellResponse<PatrolSection>>(url).then((x) => {
      return HowellResponseProcess.item(x, PatrolSection);
    });
  }

  async list(params: GetPatrolSectionsParams) {
    let url = ArmGeographicUrl.patrol.section.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<PatrolSection>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, PatrolSection);
      });
  }

  async all(params: GetPatrolSectionsParams = new GetPatrolSectionsParams()) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }
}
