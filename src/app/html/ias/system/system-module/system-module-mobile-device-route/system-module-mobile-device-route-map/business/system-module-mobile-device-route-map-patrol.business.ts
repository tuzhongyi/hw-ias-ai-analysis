import { GisPointMatchResult } from '../../../../../../../common/data-core/models/arm/geographic/patrol/gis-point-match-result.model';
import { MobileDevice } from '../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import {
  GetPatrolPlansParams,
  MatchPatrolPlansParams,
} from '../../../../../../../common/data-core/requests/services/geographic/patrol/patrol-plan/geographic-patrol-plan.params';
import { GetPatrolSectionsParams } from '../../../../../../../common/data-core/requests/services/geographic/patrol/patrol-section/geographic-patrol-section.params';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { SystemModuleMobileDeviceRouteArgs } from '../../system-module-mobile-device-route.model';

export class SystemModuleMobileDeviceRouteMapPatrolBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async match(args: SystemModuleMobileDeviceRouteArgs) {
    let plans = await this.data.plan(args.deviceId);
    let all = plans.map((x) => {
      return this.data.match(x.Id, args);
    });
    let matchs = await Promise.all(all);
    return matchs.map((x) =>
      (x.PatrolSections ?? []).map((x) => x.GeoLine ?? []),
    );
  }
  async section(device: MobileDevice) {
    let plans = await this.data.plan(
      device.Id,
      device.GridCellId ?? device.DivisionId,
    );
    let sectionIds = plans
      .map((x) => x.PatrolSections ?? [])
      .flat()
      .map((x) => x.SectionId);
    if (sectionIds.length === 0) return [];
    let params = new GetPatrolSectionsParams();
    params.Ids = sectionIds;
    return this.service.patrol.section.all(params);
  }

  private convert(datas: GisPointMatchResult[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let result = ObjectTool.model.GisPointMatchResult.split(datas);
    return result;
  }

  private data = {
    plan: (deviceId: string, divisionId?: string) => {
      let params = new GetPatrolPlansParams();
      params.MobileDeviceId = deviceId;
      if (divisionId) {
        params.DivisionIds = [divisionId];
      }

      return this.service.patrol.plan.all(params);
    },
    match: (planId: string, args: SystemModuleMobileDeviceRouteArgs) => {
      let params = new MatchPatrolPlansParams();
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.MobileDeviceId = args.deviceId;
      params.PatrolPlanId = planId;
      return this.service.patrol.plan.match(params);
    },
  };
}
