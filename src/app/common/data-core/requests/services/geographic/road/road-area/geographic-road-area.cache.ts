import { IService } from '../../../../../cache/cache.interface';
import { ServiceCache } from '../../../../../cache/service.cache';
import { RoadArea } from '../../../../../models/arm/geographic/road-area.model';
import { GetRoadAreasParams } from './geographic-road-area.params';

export class RoadAreaCache extends ServiceCache<RoadArea> {
  constructor(key: string, service: IService<RoadArea>) {
    super(key, service, RoadArea);
  }
  override filter(datas: RoadArea[], params: GetRoadAreasParams): RoadArea[] {
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
