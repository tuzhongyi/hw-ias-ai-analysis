import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ArrayTool } from '../../../../../common/tools/array-tool/array.tool';
import { SystemMapDistanceArgs } from '../system-map.model';
import { SystemMapShopArgs } from './system-map-shop.model';

@Injectable()
export class SystemMapShopBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    if (args.task && args.task.length > 0) {
      let compareshops = [];
      for (let i = 0; i < args.task.length; i++) {
        const id = args.task[i];
        let taskshops = await this.task(id, args);
        compareshops.push(taskshops);
      }
      if (compareshops.length == 2) {
        let result = ArrayTool.compare(
          compareshops[0],
          compareshops[1],
          (a, b) => a.Id === b.Id
        );
        console.log(result);
        result.duplicates.forEach(
          (item) => (item.ObjectState = ShopObjectState.Existed)
        );
        console.log(result);
        result.uniqueInA.forEach(
          (item) => (item.ObjectState = ShopObjectState.Disappeared)
        );
        result.uniqueInB.forEach(
          (item) => (item.ObjectState = ShopObjectState.Created)
        );
        return [...result.uniqueInB, ...result.uniqueInA, ...result.duplicates];
      }
    }
    return this.data(args, distance);
  }

  data(args: SystemMapShopArgs, distance: SystemMapDistanceArgs) {
    let params = new GetShopsParams();
    if (distance.enabled) {
      params.Location = GisPoint.create(distance.center.X, distance.center.Y);
      params.LocationDistance = distance.distance;
    }

    if (args.name) {
      params.Name = args.name;
    }
    if (args.telphone) {
      params.Telphone = args.telphone;
    }
    if (args.type) {
      params.ShopTypes = [args.type];
    }
    if (args.camera) {
      params.CameraNos = [args.camera];
    }
    if (args.label) {
      params.ResultLabelTypes = [args.label];
    }
    if (args.state) {
      params.ObjectStates = [args.state];
    }

    if (args.task) {
      params.TaskIds = args.task;
    }

    return this.service.shop.all(params);
  }

  private task(taskId: string, args: SystemMapShopArgs) {
    let params = new GetShopsParams();

    if (args.name) {
      params.Name = args.name;
    }
    if (args.telphone) {
      params.Telphone = args.telphone;
    }
    if (args.type) {
      params.ShopTypes = [args.type];
    }
    if (args.camera) {
      params.CameraNos = [args.camera];
    }
    if (args.label) {
      params.ResultLabelTypes = [args.label];
    }
    if (args.state) {
      params.ObjectStates = [args.state];
    }
    params.TaskIds = [taskId];
    return this.service.shop.all(params);
  }
}
