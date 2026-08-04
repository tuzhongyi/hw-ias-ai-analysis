import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectStockManagerComponent } from '../system-module-road-object-stock-manager.component';

export class SystemModuleRoadObjectStockManagerPictureWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectStockManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  page?: Page;

  open(paged: Paged<RoadObjectStock>) {
    this.page = paged.Page;
    this.id = paged.Data.ImageUrl;
    this.title = `${paged.Data.Name}`;
    this.show = true;
  }
  change(page: Page) {
    this.that.table.page.emit({ index: page.PageIndex, picture: true });
  }
}
