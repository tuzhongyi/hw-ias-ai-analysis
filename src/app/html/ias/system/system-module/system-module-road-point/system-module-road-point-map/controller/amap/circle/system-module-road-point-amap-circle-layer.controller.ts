import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SystemAMapCircleController } from '../../../../../../system-map/component/controller/amap/circle/system-map-amap-circle.controller';

export class SystemModuleRoadPointAMapCircleLayerController {
  constructor(private map: AMap.Map) {}

  circles = new Map<string, SystemAMapCircleController>();
  selected?: string;

  load(datas: RoadPoint[]) {
    datas.forEach((x) => {
      let gcj02 = x.Location?.GCJ02;
      let center = [gcj02?.Longitude, gcj02?.Latitude] as [number, number];
      let ctr = new SystemAMapCircleController(this.map);
      ctr.create({
        radius: x.Raduis || 15,
        center: center,
      });
      this.circles.set(x.Id, ctr);
    });
  }

  clear() {
    this.circles.forEach((x) => x.remove());
    this.circles.clear();
  }

  select(data: RoadPoint) {
    if (this.selected) {
      if (this.selected === data.Id) return;
      let selected = this.circles.get(this.selected);
      selected?.blur();
    }

    let selected = this.circles.get(data.Id);
    selected?.select();
    this.selected = data.Id;
    return selected?.get();
  }

  blur() {
    if (this.selected) {
      let selected = this.circles.get(this.selected);
      selected?.blur();
      this.selected = undefined;
    }
  }
}
