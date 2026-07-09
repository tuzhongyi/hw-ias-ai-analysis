import { IService } from '../../../../../cache/cache.interface';
import { ServiceCache } from '../../../../../cache/service.cache';
import { PatrolPlan } from '../../../../../models/arm/geographic/patrol/patrol-plan.model';
import { GetPatrolPlansParams } from '../geographic-patrol-plan.params';

export class PatrolPlanCache extends ServiceCache<PatrolPlan> {
  constructor(key: string, service: IService<PatrolPlan>) {
    super(key, service, PatrolPlan);
  }
  override filter(
    datas: PatrolPlan[],
    params: GetPatrolPlansParams,
  ): PatrolPlan[] {
    if (params.Name) {
      datas = datas.filter((x) => {
        return (x.Name ?? '')
          .toLocaleLowerCase()
          .includes((params.Name ?? '').toLocaleLowerCase());
      });
    }
    if (params.Ids && params.Ids.length > 0) {
      datas = datas.filter((x) => {
        return params.Ids!.includes(x.Id);
      });
    }
    return datas;
  }
}
