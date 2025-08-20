import { SystemMainManagerDetailsWindow } from './details/system-main-manager-details.window';
import { SystemMainManagerPictureWindow } from './picture/system-main-manager-picture.window';
import { SystemMainManagerVideoRecordWindow } from './video/system-main-manager-video-record.window';
import { SystemMainManagerVideoShopWindow } from './video/system-main-manager-video-shop.window';

export class SystemMainManagerWindow {
  picture = new SystemMainManagerPictureWindow();
  video = {
    shop: new SystemMainManagerVideoShopWindow(),
    record: new SystemMainManagerVideoRecordWindow(),
  };
  details = new SystemMainManagerDetailsWindow();
}
