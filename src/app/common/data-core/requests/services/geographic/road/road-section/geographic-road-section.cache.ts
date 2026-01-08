import { IService } from '../../../../../cache/cache.interface';
import { ServiceCache } from '../../../../../cache/service.cache';
import { RoadSection } from '../../../../../models/arm/geographic/road-section.model';

import { Road } from '../../../../../models/arm/geographic/road.model';
import { GetRoadSectionsParams } from './geographic-road-section.params';

export class RoadSectionCache extends ServiceCache<Road> {
  constructor(key: string, service: IService<Road>) {
    super(key, service, Road);
  }
  override filter(datas: RoadSection[], params: GetRoadSectionsParams): Road[] {
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
