import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemAMapPointInfoController } from './system-map-amap-point-info.controller';
import { SystemAMapPointController } from './system-map-amap-point.controller';

export class SystemAMapLayerController {
  constructor(private map: any) {
    this.layer = this.init(map);
    this.info = new SystemAMapPointInfoController(map);
  }

  private layer: AMap.LabelsLayer;
  private info: SystemAMapPointInfoController;
  private points: SystemAMapPointController[] = [];

  private init(map: any) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    });
    map.add(layer);
    return layer;
  }

  private regist(point: SystemAMapPointController) {
    point.mouseover.subscribe((data) => {
      this.info.add(data);
    });
    point.mouseout.subscribe((data) => {
      this.info.remove();
    });
  }

  async load(datas: Shop[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = new SystemAMapPointController();
        this.regist(point);
        let marker = point.create(data)!;
        markers.push(marker);
        this.points.push(point);
      }
    }
    this.layer.add(markers);
  }

  clear() {
    this.layer.clear();
    this.points = [];
  }
}
