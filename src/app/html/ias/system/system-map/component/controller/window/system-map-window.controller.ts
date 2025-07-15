import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

@Injectable()
export class SystemMapWindowController {
  picture = new PictureWindow();
}

class PictureWindow extends WindowViewModel {
  topage = new EventEmitter<Page>();
  clear() {
    this.id = undefined;
    this.polygon = [];
    this.title = '';
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  polygon: HowellPoint[] = [];
  page?: Page;

  onpage(page: Page) {
    this.page = page;
    this.topage.emit(page);
  }
}
