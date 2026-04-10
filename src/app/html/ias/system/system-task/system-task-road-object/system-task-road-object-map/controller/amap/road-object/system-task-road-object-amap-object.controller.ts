import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapInfoController } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { IASMapAMapRoadObjectPointLayerController } from '../../../../../../../share/map/controller/amap/road-object/point/ias-map-amap-road-object-point-layer.controller';

export class SystemTaskRoadObjectAMapObjectController {
  constructor(
    map: AMap.Map,
    container: Loca.Container,
    info: IASMapAMapInfoController,
    subscription: Subscription
  ) {
    this.point = new IASMapAMapRoadObjectPointLayerController(container);
    this.marker = new IASMapAMapRoadObjectMarkerLayerController(
      map,
      info,
      subscription
    );
  }

  private point: IASMapAMapRoadObjectPointLayerController;
  private marker: IASMapAMapRoadObjectMarkerLayerController;

  load(datas: RoadObject[]) {
    this.point.load(datas);
    return this.marker.load(datas);
  }
  clear() {
    this.point.clear();
    this.marker.clear();
  }
}
