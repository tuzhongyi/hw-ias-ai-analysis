import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IIASMapArgs } from '../../../ias-map.model';
import { IASMapAMapIconController } from './ias-map-amap-icon.controller';

export class IASMapAMapPointController {
  private icon = new IASMapAMapIconController();

  marker = new PromiseValue<AMap.Marker>();
  position: [number, number] = [0, 0];

  set(data: GisPoint, args: IIASMapArgs) {
    this.position = [data.Longitude, data.Latitude];
    let icon = this.icon.get(args.type, args.color);
    let marker = new AMap.Marker({
      position: this.position,
      draggable: false,
      icon: icon,
      offset: this.icon.offset,
    });
    this.regist(marker);

    this.marker.set(marker);

    return marker;
  }

  private regist(marker: AMap.Marker) {
    marker.on('mouseover', () => {
      this.mouse.over();
    });
    marker.on('mouseout', () => {
      this.mouse.out();
    });
  }

  mouse = {
    over: () => {
      this.marker.get().then((x) => {
        let icon = this.icon.mouse.over();
        x.setIcon(icon);
      });
    },
    out: () => {
      this.marker.get().then((x) => {
        let icon = this.icon.mouse.out();
        x.setIcon(icon);
      });
    },
  };

  select() {
    this.marker.get().then((x) => {
      let icon = this.icon.mouse.over();
      x.setIcon(icon);
    });
  }
}
