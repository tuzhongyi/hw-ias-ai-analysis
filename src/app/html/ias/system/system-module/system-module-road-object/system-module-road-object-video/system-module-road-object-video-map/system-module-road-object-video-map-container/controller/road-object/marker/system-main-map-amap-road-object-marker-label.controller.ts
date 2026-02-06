import { RoadObject } from '../../../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemMainMapAMapRoadObjectIconController } from './system-main-map-amap-road-object-icon.controller';

export class SystemMainMapAMapRoadObjectMarkerLabelController extends IASMapAMapMarkerLabelAbstract<RoadObject> {
  constructor(data: RoadObject) {
    super(data);
    this.icon = this.init();
    this.out();
  }

  protected _icon = new SystemMainMapAMapRoadObjectIconController();

  init() {
    return {
      normal: this._icon.get(this.data.ObjectType, this.data.ObjectState)
        .normal,
      hover: this._icon.get(this.data.ObjectType, this.data.ObjectState).hover,
      selected: this._icon.get(this.data.ObjectType, this.data.ObjectState)
        .selected,
    };
  }

  private get = {
    icon: () => {
      return this.icon;
    },
  };
}
