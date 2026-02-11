import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapMarkerLabelAbstract } from '../../marker/ias-map-amap-marker-label.abstract';
import { IASMapAMapRoadObjectIconController } from './ias-map-amap-road-object-icon.controller';

export class IASMapAMapRoadObjectMarkerLabelController<
  T extends IASMapAMapRoadObjectIconController
> extends IASMapAMapMarkerLabelAbstract<RoadObject> {
  constructor(
    data: RoadObject,
    icon: T = new IASMapAMapRoadObjectIconController() as T
  ) {
    super(data);
    this.icon = icon.get(data.ObjectType, data.ObjectState);

    this.out();
  }
}
