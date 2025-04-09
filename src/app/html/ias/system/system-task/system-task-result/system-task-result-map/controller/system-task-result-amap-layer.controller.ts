import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemTaskResultAMapPointController as Point } from './system-task-result-amap-point.controller';

export class SystemTaskResultAMapLayerController {
  constructor(private map: AMap.Map) {
    this.layer = this.init(map);
  }

  loaded = false;

  loading() {
    return new Promise<void>((resolve) => {
      wait(
        () => {
          return this.loaded;
        },
        () => {
          resolve();
        }
      );
    });
  }

  layer: AMap.LabelsLayer;
  private points: Point[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    });
    map.add(layer);
    return layer;
  }

  private create(data: ShopSign) {
    if (data.Location) {
      let point = new Point(data, data.Location);
      this.points.push(point);
      return point.marker;
    }
    return undefined;
  }

  async load(datas: ShopSign[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let marker = this.create(data);
        if (marker) {
          markers.push(marker);
        }
      }
    }
    this.layer.add(markers);
    this.loaded = true;
  }

  clear() {
    this.layer.clear();
    this.points = [];
    this.loaded = false;
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
      if (position) {
        this.map.setCenter(position);
      }
    }
  }
}
