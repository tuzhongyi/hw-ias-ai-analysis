import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemTaskResultAMapPointController as Point } from './system-task-result-amap-point.controller';
declare var AMap: any;
export class SystemTaskResultAMapLayerController {
  constructor(private map: any) {
    this.layer = this.init(map);
  }

  layer: any;
  private points: Point[] = [];

  private init(map: any) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    });
    map.add(layer);
    return layer;
  }

  private create(data: ShopSign) {
    if (data.Location) {
      let point = new Point(data);
      this.points.push(point);
      return point.marker;
    }
  }

  async load(datas: ShopSign[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let marker = this.create(data);
        markers.push(marker);
      }
    }
    this.layer.add(markers);
  }

  select(id: string) {
    this.points.forEach((x) => {
      x.blur();
    });
    let selected = this.points.find((x) => {
      return x.data.Id === id;
    });
    if (selected) {
      let position = selected.select();
      this.map.setCenter(position);
    }
  }
}
