import { MapBreathPath } from './breath/map-breath.path';
import { MapMarkerPath } from './marker/map-marker.path';
import { MapPointPath } from './point/map-point.path';

export class MapPath {
  constructor(private node: string) {
    this.base = `${this.node}/assets/image/map`;
  }

  private base: string;

  private get marker() {
    return new MapMarkerPath(this.base);
  }

  get point() {
    return new MapPointPath(this.base);
  }

  get shop() {
    return this.marker.shop;
  }
  get alarm() {
    return {
      icon: this.marker.alarm.icon,
      info: this.marker.alarm.info,
      breath: new MapBreathPath(this.base),
    };
  }

  get device() {
    return this.marker.device;
  }

  get object() {
    return this.marker.object;
  }
}
