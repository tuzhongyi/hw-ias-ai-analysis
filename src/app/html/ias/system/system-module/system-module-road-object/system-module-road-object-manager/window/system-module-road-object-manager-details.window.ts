import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Paged } from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { PickupModel } from '../../system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.model';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.large,
  };

  title = '道路部件详情';

  data?: RoadObject;
  pickup = new EventEmitter<PickupModel>();

  open(data?: RoadObject) {
    this.data = data;
    this.show = true;
  }

  picture(data: RoadObject) {
    let paged = Paged.create(data, 1, 1, 1);
    this.that.window.picture.open(paged);
  }
}
