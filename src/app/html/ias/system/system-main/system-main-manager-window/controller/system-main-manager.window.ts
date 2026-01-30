import { SystemMainManagerDetailsMobileWindow } from './details/system-main-manager-details-mobile.window';
import { SystemMainManagerDetailsSampleWindow } from './details/system-main-manager-details-sample.window';
import { SystemMainManagerMobileDeviceWindow } from './device/system-main-manager-mobile-device.window';
import { SystemMainManagerMobileRouteWindow } from './device/system-main-manager-mobile-route.window';
import { SystemMainManagerPictureWindow } from './picture/system-main-manager-picture.window';
import { SystemMainManagerRecordWindow } from './record/system-main-manager-record.window';
import { SystemMainManagerRoadObjectWindow } from './road/system-main-manager-road-object.window';
import { SystemMainManagerRoadWindow } from './road/system-main-manager-road.window';
import { SystemMainManagerShopWindow } from './shop/system-main-manager-shop.window';
import { SystemMainManagerTaskGPSWindow } from './task/system-main-manager-task-gps.window';
import { SystemMainManagerTaskShopWindow } from './task/system-main-manager-task-shop.window';

import { SystemMainManagerVideoRecordWindow } from './video/system-main-manager-video-record.window';
import { SystemMainManagerVideoSampleWindow } from './video/system-main-manager-video-sample.window';
import { SystemMainManagerVideoShopWindow } from './video/system-main-manager-video-shop.window';

export class SystemMainManagerWindow {
  picture = new SystemMainManagerPictureWindow();
  video = {
    shop: new SystemMainManagerVideoShopWindow(),
    record: new SystemMainManagerVideoRecordWindow(),
    sample: new SystemMainManagerVideoSampleWindow(),
  };
  details = {
    mobile: new SystemMainManagerDetailsMobileWindow(),
    sample: new SystemMainManagerDetailsSampleWindow(),
  };
  record = new SystemMainManagerRecordWindow();
  task = {
    shop: new SystemMainManagerTaskShopWindow(),
    gps: new SystemMainManagerTaskGPSWindow(),
  };
  road = new SystemMainManagerRoadWindow();
  shop = new SystemMainManagerShopWindow();
  device = {
    mobile: new SystemMainManagerMobileDeviceWindow(),
    route: new SystemMainManagerMobileRouteWindow(),
  };
  roadobject = new SystemMainManagerRoadObjectWindow();
}
