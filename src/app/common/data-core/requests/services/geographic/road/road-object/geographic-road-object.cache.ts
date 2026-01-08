import { IService } from '../../../../../cache/cache.interface';
import { ServiceCache } from '../../../../../cache/service.cache';
import { RoadObject } from '../../../../../models/arm/geographic/road-object.model';

import { Road } from '../../../../../models/arm/geographic/road.model';
import { GetRoadObjectsParams } from './geographic-road-object.params';

export class RoadObjectCache extends ServiceCache<Road> {
  constructor(key: string, service: IService<Road>) {
    super(key, service, Road);
  }
  override filter(datas: RoadObject[], params: GetRoadObjectsParams): Road[] {
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
