import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IIASMapArgs } from '../../../ias-map.model';
import { IASMapAMapIconController } from '../shop/marker/ias-map-amap-shop-icon.controller';

export class IASMapAMapPointController {
  private icon = new IASMapAMapIconController();

  marker = new PromiseValue<AMap.Marker>();
  position: [number, number] = [0, 0];

  set(data: GisPoint, args: IIASMapArgs) {
    this.position = [data.Longitude, data.Latitude];
    this.icon.set.path(args.path);
    this.icon.set.size(args.size);
    let icon = this.icon.get();
    let marker = new AMap.Marker({
      position: this.position,
      draggable: false,
      icon: icon,
      offset: args.offset ?? this.icon.offset,
      rotate: data.Course,
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
