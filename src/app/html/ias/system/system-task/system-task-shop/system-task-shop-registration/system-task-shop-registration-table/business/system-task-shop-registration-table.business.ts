import { Injectable } from '@angular/core';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationTaskDetectedResultParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { SystemTaskShopRegistrationTableArgs } from '../system-task-shop-registration-table.model';

@Injectable()
export class SystemTaskShopRegistrationTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  count = {
    all: 0,
    detected: 0,
    undetected: 0,
    clear: () => {
      this.count.all = 0;
      this.count.detected = 0;
      this.count.undetected = 0;
    },
  };

  async load(args: SystemTaskShopRegistrationTableArgs) {
    if (!args.taskId) {
      throw new Error('Task ID is required to load shop registrations.');
    }
    let datas = await this.data.load(args.taskId);
    this.count.clear();
    this.count.all = datas.length;
    let results = [];
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.Detected) {
        this.count.detected++;
      } else {
        this.count.undetected++;
      }
      if (this.filter(item, args)) {
        results.push(item);
      }
    }
    return results;
  }

  filter(
    item: ShopRegistrationTaskDetectedResult,
    args: SystemTaskShopRegistrationTableArgs
  ) {
    let result = {
      name: true,
      road: {
        on: true,
        ori: true,
      },
      detected: true,
    };
    if (args.name) {
      result.name = item.Name.toLowerCase().includes(args.name.toLowerCase());
    }
    if (args.road.on) {
      result.road.on = item.RoadId === args.road.on;
    }
    if (args.road.ori) {
      result.road.ori = item.OriRoadId === args.road.ori;
    }
    if (args.detected != undefined) {
      result.detected = item.Detected == args.detected;
    }

    return result.name && result.road.on && result.road.ori && result.detected;
  }

  private data = {
    load: (taskId: string) => {
      let params = new GetShopRegistrationTaskDetectedResultParams();
      params.TaskIds = [taskId];
      params.RouteFilterEnabled = true;
      return this.service.shop.task.detected.result.all(params);
    },
  };
}
