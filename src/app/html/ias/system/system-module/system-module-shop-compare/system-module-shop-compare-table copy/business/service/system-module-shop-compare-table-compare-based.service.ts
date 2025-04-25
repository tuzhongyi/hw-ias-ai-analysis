import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ArrayTool } from '../../../../../../../../common/tools/array-tool/array.tool';

@Injectable()
export class SystemModuleShopCompareTableCompareBasedService {
  constructor(private service: ArmAnalysisRequestService) {}

  count = {
    created: 0,
    disappeared: 0,
    existed: 0,
  };

  async compare(taskIds: string[], comparecount: number) {
    let based = await this.based(comparecount);
    let shop = await this.shop(taskIds);
    let compare = ArrayTool.compare(based, shop, (a, b) => a.Id === b.Id);
    compare.duplicates.forEach(
      (item) => (item.ObjectState = ShopObjectState.Existed)
    );

    compare.uniqueInA.forEach(
      (item) => (item.ObjectState = ShopObjectState.Disappeared)
    );
    compare.uniqueInB.forEach(
      (item) => (item.ObjectState = ShopObjectState.Created)
    );
    this.count.existed = compare.duplicates.length;
    this.count.disappeared = compare.uniqueInA.length;
    this.count.created = compare.uniqueInB.length;

    return [...compare.uniqueInB, ...compare.uniqueInA, ...compare.duplicates];
  }

  private async shop(taskIds: string[]) {
    let params = new GetShopsParams();
    params.TaskIds = taskIds;
    params.ShopTypes = [1, 4];
    return this.service.shop.all(params);
  }

  private async based(comparecount: number) {
    let params = new GetShopsParams();
    params.MinTaskCount = comparecount;
    params.ShopTypes = [1, 4];
    return this.service.shop.all(params);
  }
}
