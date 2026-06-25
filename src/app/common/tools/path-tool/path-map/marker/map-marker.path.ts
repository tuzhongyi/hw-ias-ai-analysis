import { LocalStorage } from '../../../../storage/local.storage';
import { MapMarkerAlarmPath } from './alarm/map-marker-alarm.path';
import { MapMarkerDevicePath } from './device/map-marker-device.path';
import { MapMarkerDogPath } from './device/map-marker-dog.path';
import { MapMarkerObjectPath } from './object/map-marker-object.path';
import { MapMarkerShopPath } from './shop/map-marker-shop.path';

export class MapMarkerPath {
  constructor(
    path: string,
    private local?: LocalStorage,
  ) {
    this.basic = `${path}/marker`;
  }

  private basic: string;

  get object() {
    return new MapMarkerObjectPath(this.basic);
  }

  get shop() {
    return new MapMarkerShopPath(this.basic);
  }
  get alarm() {
    return new MapMarkerAlarmPath(this.basic);
  }
  get device() {
    if (this.local) {
      if (this.local.auth.is.putuoqu) {
        return this.dog;
      }
    }

    return new MapMarkerDevicePath(this.basic);
  }
  get dog() {
    return new MapMarkerDogPath(this.basic);
  }
}
