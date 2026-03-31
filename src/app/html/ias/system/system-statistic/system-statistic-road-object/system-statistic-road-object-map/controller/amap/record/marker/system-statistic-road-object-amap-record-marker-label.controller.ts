import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { INameModel } from '../../../../../../../../../../common/data-core/models/interface/model.interface';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemMainMapAMapRoadObjectIconController } from '../../../../../../../system-main/system-main-map/controller/amap/road-object/marker/system-main-map-amap-road-object-icon.controller';

class RoadObjectEventRecordModel
  extends RoadObjectEventRecord
  implements INameModel
{
  get Name(): string {
    return this.RoadObjectName;
  }
}
export class SystemStatisticRoadObjectAMapRecordMarkerLabelController extends IASMapAMapMarkerLabelAbstract<RoadObjectEventRecordModel> {
  constructor(data: RoadObjectEventRecordModel) {
    super(data);
    this.icon = this.init();
    this.out();
  }

  protected _icon = new SystemMainMapAMapRoadObjectIconController();

  init() {
    return {
      normal: this._icon.get(this.data.RoadObjectType, {
        event: this.data.EventType,
      }).normal,
      hover: this._icon.get(this.data.RoadObjectType, {
        event: this.data.EventType,
      }).hover,
      selected: this._icon.get(this.data.RoadObjectType, {
        event: this.data.EventType,
      }).selected,
    };
  }

  private get = {
    icon: () => {
      return this.icon;
    },
  };
}
