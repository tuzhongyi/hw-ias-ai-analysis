import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapInfoController } from '../../../../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { SystemMainMapAMapRoadObjectIconController } from './system-main-map-amap-road-object-icon.controller';
import { SystemMainMapAMapRoadObjectMarkerLabelController } from './system-main-map-amap-road-object-marker-label.controller';

export class SystemMainMapAMapRoadObjectMarkerLayerController extends IASMapAMapRoadObjectMarkerLayerController<
  SystemMainMapAMapRoadObjectIconController,
  SystemMainMapAMapRoadObjectMarkerLabelController
> {
  constructor(
    map: AMap.Map,
    info: IASMapAMapInfoController,
    subscription: Subscription
  ) {
    super(map, info, subscription);
  }
  protected override create(data: RoadObject) {
    return new SystemMainMapAMapRoadObjectMarkerLabelController(data);
  }
}
