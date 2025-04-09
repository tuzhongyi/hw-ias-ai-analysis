import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';

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
    width: '50%',
    height: 'auto',
    aspectRatio: '16/9',
    paddingTop: 0,
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
