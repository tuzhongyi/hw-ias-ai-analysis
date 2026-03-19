import { Injectable } from '@angular/core';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async delete(datas: RoadObject[]) {
    let faults = [];
    let success = [];
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i];
      try {
        let result = await this.service.road.object.delete(datas[i].Id);
        success.push(item);
      } catch (error) {
        faults.push(item);
      }
    }
    return {
      success,
      faults,
    };
  }

  async disable(datas: RoadObject[]) {
    let faults = [];
    let success = [];
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i];
      item.Disable = true;
      try {
        let result = await this.service.road.object.update(item);
        success.push(item);
      } catch (error) {
        faults.push(item);
      }
    }
    return {
      success,
      faults,
    };
  }
  async enable(datas: RoadObject[]) {
    let faults = [];
    let success = [];
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i];
      item.Disable = false;
      try {
        let result = await this.service.road.object.update(item);
        success.push(item);
      } catch (error) {
        faults.push(item);
      }
    }
    return {
      success,
      faults,
    };
  }
}
