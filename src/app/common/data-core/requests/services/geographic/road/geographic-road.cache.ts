import { IService } from '../../../../cache/cache.interface';
import { ServiceCache } from '../../../../cache/service.cache';

import { Road } from '../../../../models/arm/geographic/road.model';
import { GetRoadsParams } from './geographic-road.params';

export class RoadCache extends ServiceCache<Road> {
  constructor(key: string, service: IService<Road>) {
    super(key, service, Road);
  }
  override filter(datas: Road[], params: GetRoadsParams): Road[] {
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
