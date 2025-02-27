import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { Point } from '../../../../common/data-core/models/arm/point.model';

export class SystemModuleShopDetailsWindow {
  picture = new PictureWindow();
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.id = undefined;
    this.polygon = [];
    this.title = '';
  }
  style = {
    width: '100%',
    height: '100%',
    paddingTop: 0,
  };
  title = '';
  id?: string;
  polygon: Point[] = [];
}
