import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { Point } from '../../../../common/data-core/models/arm/point.model';

export class SystemTaskResultWindow {
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
    paddingTop: '10px',
  };
  title = '';
  id?: string;
  polygon: Point[] = [];
}