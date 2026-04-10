import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemTaskRoadObjectManagerComponent } from '../system-task-road-object-manager.component';

export class SystemTaskRoadObjectManagerPictureWindow extends WindowViewModel {
  constructor(that: SystemTaskRoadObjectManagerComponent) {
    super();
  }

  clear() {
    this.id = undefined;
    this.title = '';
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  page?: Page;

  open(paged: Paged<RoadObject>) {
    this.page = paged.Page;
    this.id = paged.Data.ImageUrl;
    this.title = `${paged.Data.Name}-${paged.Data.Address}`;
    this.show = true;
  }
  change(page: Page) {}
}
