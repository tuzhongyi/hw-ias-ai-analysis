import { RoadObject } from '../../../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapRoadObjectMarkerLabelController } from '../../../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-label.controller';
import { SystemMainMapAMapRoadObjectIconController } from './system-main-map-amap-road-object-icon.controller';

export class SystemMainMapAMapRoadObjectMarkerLabelController extends IASMapAMapRoadObjectMarkerLabelController<SystemMainMapAMapRoadObjectIconController> {
  constructor(data: RoadObject) {
    super(data, new SystemMainMapAMapRoadObjectIconController());
  }
}
