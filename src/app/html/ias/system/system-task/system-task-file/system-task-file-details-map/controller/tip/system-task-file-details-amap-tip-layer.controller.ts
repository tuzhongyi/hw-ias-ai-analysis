import { AMapInputTipItem } from '../../../../../../../../common/helper/map/amap.model';
import { SystemAMapShopInfoController } from '../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-info.controller';
import { ISystemAMapShopMarkerInfo } from '../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-marker.model';
import {
  SystemTaskFileDetailsAMapSearchPointController,
  SystemTaskFileDetailsAMapTipEvent,
} from './system-task-file-details-amap-tip.controller';

export class SystemTaskFileDetailsAMapTipLayerController {
  event = new SystemTaskFileDetailsAMapTipEvent();

  constructor(map: AMap.Map) {
    this.zoom = map.getZoom();
    this.layer = this.init(map);
    this.info = new SystemAMapShopInfoController(map);
  }

  private layer: AMap.LabelsLayer;
  private info: SystemAMapShopInfoController;
  private points: SystemTaskFileDetailsAMapSearchPointController[] = [];
  private zoom: number;

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    });
    map.add(layer);
    return layer;
  }

  private regist(point: SystemTaskFileDetailsAMapSearchPointController) {
    point.event.mouseover.subscribe((data) => {
      let info: ISystemAMapShopMarkerInfo = {
        Name: data.name,
        Location: data.location,
      };

      this.info.add(info, this.zoom, [0, -40]);
      this.event.mouseover.emit(data);
    });
    point.event.mouseout.subscribe((data) => {
      this.info.remove();
      this.event.mouseout.emit(data);
    });
    point.event.click.subscribe((data) => {
      this.select(data);
      this.event.click.emit(data);
    });
  }

  async load(datas: AMapInputTipItem[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.location) {
        let point = new SystemTaskFileDetailsAMapSearchPointController(data);
        this.regist(point);
        markers.push(point.marker);
        this.points.push(point);
      }
    }
    this.layer.add(markers);
    return markers;
  }

  clear() {
    this.layer.clear();
    this.points = [];
  }

  mouseover(data: AMapInputTipItem) {
    let info: ISystemAMapShopMarkerInfo = {
      Name: data.name,
      Location: data.location,
    };
    this.info.add(info, this.zoom, [0, -40]);
    let point = this.points.find((x) => x.data.id === data.id);
    if (point) {
      point.hover();
    }
  }
  mouseout(data: AMapInputTipItem) {
    this.info.remove();
    let point = this.points.find((x) => x.data.id === data.id);
    if (point) {
      point.out();
    }
  }

  select(data: AMapInputTipItem) {
    this.blur();
    let point = this.points.find((x) => x.data.id === data.id);
    if (point) {
      point.select();
    }
  }

  blur() {
    this.points.forEach((x) => {
      if (x.selected) {
        x.blur();
      }
    });
  }

  set = {
    zoom: (zoom: number) => {
      this.zoom = zoom;
      this.info.set.offset(zoom);
    },
  };
}
