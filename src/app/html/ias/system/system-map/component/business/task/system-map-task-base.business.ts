import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';
import { ISystemMapStorage } from '../../../../../../../common/storage/system-map-storage/system-map.storage';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import { SystemMapTaskFilter } from './system-map-task.model';

@Injectable()
export class SystemMapTaskBaseBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private local: LocalStorage
  ) {}

  private get config(): ISystemMapStorage {
    return this.local.system.map.get();
  }

  async load(filter: SystemMapTaskFilter) {
    let one = await this.data(filter, true);
    let two = await this.data(filter);
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

  private data(filter: SystemMapTaskFilter, base = false) {
    let params = new GetShopsParams();

    if (filter.name) {
      params.Name = filter.name;
    }

    params.TaskIds = filter.ids;

    if (base) {
      params.MinTaskCount = this.config.mintaskcount;
    }
    return this.service.shop.all(params);
  }
}
