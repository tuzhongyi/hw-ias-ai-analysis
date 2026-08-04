import { IRoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.interface';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapMarkerLabelAbstract } from '../../marker/ias-map-amap-marker-label.abstract';
import { IASMapAMapRoadObjectIconController } from './ias-map-amap-road-object-icon.controller';

export class IASMapAMapRoadObjectMarkerLabelController<
  TIcon extends IASMapAMapRoadObjectIconController,
  TRoadObject extends IRoadObject = RoadObject,
> extends IASMapAMapMarkerLabelAbstract<TRoadObject> {
  constructor(
    data: TRoadObject,
    icon: TIcon = new IASMapAMapRoadObjectIconController() as TIcon,
  ) {
    super(data);
    let state: number | undefined = undefined;
    if ((data as any) instanceof RoadObject) {
      state = (data as any).ObjectState;
    }
    this.icon = icon.get(data.ObjectType, state);

    this.out();
  }
}
