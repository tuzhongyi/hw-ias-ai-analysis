import { Injectable } from '@angular/core';
import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { Point } from '../../../../../../common/data-core/models/arm/point.model';

@Injectable()
export class SystemMapWindowController {
  picture = new PictureWindow();
}

class PictureWindow extends WindowViewModel {
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
  polygon: Point[] = [];
}
