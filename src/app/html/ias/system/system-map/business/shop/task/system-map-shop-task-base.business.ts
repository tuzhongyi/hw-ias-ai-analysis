import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import {
  SystemMapShopArgs,
  SystemMapTaskShopArgs,
} from '../../system-map-shop.model';

@Injectable()
export class SystemMapShopTaskBaseBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(task: SystemMapTaskShopArgs, args: SystemMapShopArgs) {
    let one = await this.data(task.base ?? [], args, true);
    let two = await this.data(task.ids, args);
    let compare = ArrayTool.compare(one, two, (a, b) => a.Id === b.Id);
    compare.duplicates.forEach(
      (item) => (item.ObjectState = ShopObjectState.Existed)
    );

    compare.uniqueInA.forEach(
      (item) => (item.ObjectState = ShopObjectState.Disappeared)
    );
    compare.uniqueInB.forEach(
      (item) => (item.ObjectState = ShopObjectState.Created)
    );
    return [...compare.uniqueInB, ...compare.uniqueInA, ...compare.duplicates];
  }

  private data(taskIds: string[], args: SystemMapShopArgs, base = false) {
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
    params.TaskIds = taskIds;

    if (base) {
      params.MinTaskCount = 2;
    }
    return this.service.shop.all(params);
  }
}
