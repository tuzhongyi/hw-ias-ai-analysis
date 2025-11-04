import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { SystemTaskFileDetailsMapPanelSearchResultListArgs } from './system-task-file-details-map-panel-search-result-list.model';

@Injectable()
export class SystemTaskFileDetailsMapPanelSearchResultListBusiness {
  constructor() {}

  async load(args: SystemTaskFileDetailsMapPanelSearchResultListArgs) {
    if (args.name && args.position) {
      return MapHelper.amap.search(args.name, args.position);
    }
    return [];
  }
}
