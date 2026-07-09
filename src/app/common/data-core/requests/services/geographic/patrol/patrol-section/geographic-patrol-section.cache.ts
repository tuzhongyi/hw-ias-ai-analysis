import { IService } from '../../../../../cache/cache.interface';
import { ServiceCache } from '../../../../../cache/service.cache';
import { PatrolSection } from '../../../../../models/arm/geographic/patrol/patrol-section.model';
import { GetPatrolSectionsParams } from './geographic-patrol-section.params';

export class PatrolSectionCache extends ServiceCache<PatrolSection> {
  constructor(key: string, service: IService<PatrolSection>) {
    super(key, service, PatrolSection);
  }
  override filter(
    datas: PatrolSection[],
    params: GetPatrolSectionsParams,
  ): PatrolSection[] {
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
