import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapMarkerLabelAbstract } from '../../marker/ias-map-amap-marker-label.abstract';
import { IASMapAMapRoadObjectIconController } from './ias-map-amap-road-object-icon.controller';

export class IASMapAMapRoadObjectMarkerLabelController extends IASMapAMapMarkerLabelAbstract<RoadObject> {
  constructor(data: RoadObject) {
    super(data);
    this.icon = this.init();
    this.out();
  }

  protected _icon = new IASMapAMapRoadObjectIconController();

  init() {
    return {
      normal: this._icon.get(this.data.ObjectType).normal,
      hover: this._icon.get(this.data.ObjectType).hover,
      selected: this._icon.get(this.data.ObjectType).selected,
    };
  }
}
