import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { ServiceTool } from '../../../../tools/service-tool/service.tool';
import { Cache } from '../../../cache/cache';
import { AbstractService } from '../../../cache/cache.interface';
import { Division } from '../../../models/arm/division/division.model';
import { PagedList } from '../../../models/page-list.model';
import { HowellResponse } from '../../../models/response';
import { ArmDivisionUrl } from '../../../urls/arm/division/division.url';
import { HowellHttpClient } from '../../howell-http.client';
import { HowellResponseProcess } from '../../service-process';
import { GetDivisionsParams } from './division.params';

@Injectable({
  providedIn: 'root',
})
@Cache(ArmDivisionUrl.basic(), Division)
export class ArmDivisionRequestService extends AbstractService<Division> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async create(data: Division) {
    let url = ArmDivisionUrl.basic();
    let plain = instanceToPlain(data);
    return this.http
      .post<HowellResponse<Division>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, Division);
      });
  }
  async get(id: string) {
    let url = ArmDivisionUrl.item(id);
    return this.http.get<HowellResponse<Division>>(url).then((x) => {
      return HowellResponseProcess.item(x, Division);
    });
  }
  async delete(id: string) {
    let url = ArmDivisionUrl.item(id);
    return this.http.delete<HowellResponse<Division>>(url).then((x) => {
      return HowellResponseProcess.item(x, Division);
    });
  }
  async update(data: Division) {
    let url = ArmDivisionUrl.item(data.Id);
    let plain = instanceToPlain(data);
    return this.http
      .put<any, HowellResponse<Division>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, Division);
      });
  }
  async list(params = new GetDivisionsParams()) {
    let url = ArmDivisionUrl.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<Division>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, Division);
      });
  }
  override all(params = new GetDivisionsParams()): Promise<Division[]> {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }
}
