import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { EventRecord } from '../../../../../common/data-core/models/arm/event/event-record.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { Page } from '../../../../../common/data-core/models/page-list.model';

export class SystemEventManagerWindow {
  picture = new PictureWindow();
  details = new DetailsWindow();
  video = new VideoWindow();
  map = new MapWindow();
}

class PictureWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '80%',
    paddingTop: 0,
  };
  datas: string[] = [];
  index = 1;
  title = '';
  page?: Page;
}
class VideoWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '74%',
    paddingTop: 0,
  };
  filename?: string;
}
class MapWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '74%',
    paddingTop: 0,
  };
  title = '';
  data?: GisPoint;
}
class DetailsWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '80%',
    paddingTop: 0,
  };
  data?: EventRecord;
}
