import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

export class SystemMainMapRoadBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load() {
    let datas = await this.service.road.cache.all();
    if (datas.length == 0) {
      throw new Error();
    }
    return datas;
  }
}
