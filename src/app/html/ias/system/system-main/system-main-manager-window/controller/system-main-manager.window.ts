import { SystemMainManagerDetailsWindow } from './details/system-main-manager-details.window';
import { SystemMainManagerPictureWindow } from './picture/system-main-manager-picture.window';
import { SystemMainManagerRecordWindow } from './record/system-main-manager-record.window';
import { SystemMainManagerRoadWindow } from './road/system-main-manager-road.window';
import { SystemMainManagerShopWindow } from './shop/system-main-manager-shop.window';
import { SystemMainManagerTaskGPSWindow } from './task/system-main-manager-task-gps.window';
import { SystemMainManagerTaskShopWindow } from './task/system-main-manager-task-shop.window';

import { SystemMainManagerVideoRecordWindow } from './video/system-main-manager-video-record.window';
import { SystemMainManagerVideoShopWindow } from './video/system-main-manager-video-shop.window';

export class SystemMainManagerWindow {
  picture = new SystemMainManagerPictureWindow();
  video = {
    shop: new SystemMainManagerVideoShopWindow(),
    record: new SystemMainManagerVideoRecordWindow(),
  };
  details = new SystemMainManagerDetailsWindow();
  record = new SystemMainManagerRecordWindow();
  task = {
    shop: new SystemMainManagerTaskShopWindow(),
    gps: new SystemMainManagerTaskGPSWindow(),
  };
  road = new SystemMainManagerRoadWindow();
  shop = new SystemMainManagerShopWindow();
}
