import { instanceToPlain } from 'class-transformer';

import { Road } from '../../../../models/arm/analysis/road.model';
import { PagedList } from '../../../../models/page-list.model';
import { HowellResponse } from '../../../../models/response';
import { ArmGeographicUrl } from '../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../howell-http.client';
import { HowellResponseProcess } from '../../../service-process';
import { GetRoadsParams } from './geographic-road.params';

export class ArmGeographicRoadRequestService {
  constructor(private http: HowellHttpClient) {}

  async get(id: string) {
    let url = ArmGeographicUrl.road.item(id);
    return this.http.get<HowellResponse<Road>>(url).then((x) => {
      return HowellResponseProcess.item(x, Road);
    });
  }

  async create(data: Road) {
    let url = ArmGeographicUrl.road.basic();
    let plain = instanceToPlain(data);
    return this.http.post<HowellResponse<Road>, any>(url, plain).then((x) => {
      return HowellResponseProcess.item(x, Road);
    });
  }

  async update(data: Road) {
    let url = ArmGeographicUrl.road.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http.put<any, HowellResponse<Road>>(url, plain).then((x) => {
      return HowellResponseProcess.item(x, Road);
    });
  }

  async list(params: GetRoadsParams) {
    let url = ArmGeographicUrl.road.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<Road>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, Road);
      });
  }
  async all(params: GetRoadsParams = new GetRoadsParams()) {
    let data: Road[] = [];
    let index = 1;
    let paged: PagedList<Road>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
}
