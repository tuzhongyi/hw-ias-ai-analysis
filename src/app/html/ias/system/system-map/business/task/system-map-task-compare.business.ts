import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { SystemMapTaskFilter } from './system-map-task.model';

@Injectable()
export class SystemMapTaskCompareBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(filter: SystemMapTaskFilter) {
    let one = await this.data(filter.ids[0], filter);
    let two = await this.data(filter.ids[1], filter);
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

  private data(taskId: string, filter: SystemMapTaskFilter) {
    let params = new GetShopsParams();

    if (filter.name) {
      params.Name = filter.name;
    }
    params.TaskIds = [taskId];
    return this.service.shop.all(params);
  }
}
