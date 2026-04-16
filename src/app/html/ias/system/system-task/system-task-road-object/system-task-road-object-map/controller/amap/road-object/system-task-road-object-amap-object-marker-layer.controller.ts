import { Subscription } from 'rxjs/internal/Subscription';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { SystemTaskRoadObjectAMapInfoController } from '../info/system-task-road-object-amap-info.controller';

export class SystemTaskRoadObjectAMapObjectMarkerLayerController extends IASMapAMapRoadObjectMarkerLayerController {
  constructor(
    map: AMap.Map,
    info: SystemTaskRoadObjectAMapInfoController,
    subscription: Subscription
  ) {
    super(map, subscription, info);
  }

  override mouseover(data: RoadObject): void {}
}
