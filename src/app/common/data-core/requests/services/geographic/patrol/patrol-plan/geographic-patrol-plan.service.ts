import { instanceToPlain } from 'class-transformer';

import { ObjectTool } from '../../../../../../tools/object-tool/object.tool';
import { ServiceTool } from '../../../../../../tools/service-tool/service.tool';
import { Cache } from '../../../../../cache/cache';
import { AbstractService } from '../../../../../cache/cache.interface';
import { PatrolPlanMatchResult } from '../../../../../models/arm/geographic/patrol/patrol-plan-match-result.model';
import { PatrolPlan } from '../../../../../models/arm/geographic/patrol/patrol-plan.model';
import { PatrolPlanCapability } from '../../../../../models/capabilities/arm/patrol-plan.capability.model';
import { PagedList } from '../../../../../models/interface/page-list.model';
import { HowellResponse } from '../../../../../models/response';
import { ArmGeographicUrl } from '../../../../../urls/arm/geographic/geographic.url';
import { HowellHttpClient } from '../../../../howell-http.client';
import { HowellResponseProcess } from '../../../../service-process';
import {
  GetPatrolPlansParams,
  MatchPatrolPlansParams,
} from './geographic-patrol-plan.params';

@Cache(ArmGeographicUrl.patrol.plan.basic(), PatrolPlan)
export class ArmGeographicPatrolPlanRequestService extends AbstractService<PatrolPlan> {
  constructor(private http: HowellHttpClient) {
    super();
  }

  async get(id: string) {
    let url = ArmGeographicUrl.patrol.plan.item(id);
    return this.http.get<HowellResponse<PatrolPlan>>(url).then((x) => {
      return HowellResponseProcess.item(x, PatrolPlan);
    });
  }

  async create(data: PatrolPlan) {
    let url = ArmGeographicUrl.patrol.plan.basic();
    let _data = ObjectTool.serialize(data, PatrolPlan);
    let plain = instanceToPlain(_data);
    return this.http
      .post<HowellResponse<PatrolPlan>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, PatrolPlan);
      });
  }

  async update(data: PatrolPlan) {
    let url = ArmGeographicUrl.patrol.plan.item(data.Id);
    let _data = ObjectTool.serialize(data, PatrolPlan);
    let plain = instanceToPlain(_data);
    return this.http
      .put<any, HowellResponse<PatrolPlan>>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, PatrolPlan);
      });
  }

  async delete(id: string) {
    let url = ArmGeographicUrl.patrol.plan.item(id);
    return this.http.delete<HowellResponse<PatrolPlan>>(url).then((x) => {
      return HowellResponseProcess.item(x, PatrolPlan);
    });
  }

  async list(params: GetPatrolPlansParams) {
    let url = ArmGeographicUrl.patrol.plan.list();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PagedList<PatrolPlan>>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.paged(x, PatrolPlan);
      });
  }

  async all(params: GetPatrolPlansParams = new GetPatrolPlansParams()) {
    return ServiceTool.all((p) => {
      return this.list(p);
    }, params);
  }

  async capability() {
    let url = ArmGeographicUrl.patrol.plan.capability();
    return this.http
      .get<HowellResponse<PatrolPlanCapability>>(url)
      .then((x) => {
        return HowellResponseProcess.item(x, PatrolPlanCapability);
      });
  }

  async match(params: MatchPatrolPlansParams) {
    let url = ArmGeographicUrl.patrol.plan.match();
    let plain = instanceToPlain(params);
    return this.http
      .post<HowellResponse<PatrolPlanMatchResult>, any>(url, plain)
      .then((x) => {
        return HowellResponseProcess.item(x, PatrolPlanMatchResult);
      });
  }
}
