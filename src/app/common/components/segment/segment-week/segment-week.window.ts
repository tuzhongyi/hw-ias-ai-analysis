import { WindowViewModel } from '../../window-control/window.model';

export class SegmentWeekWindow {
  copy = new CopyWindow();
}

class CopyWindow extends WindowViewModel {
  style = {
    width: '300px',
    height: 'auto',
  };
  title = '复制到...';
}
