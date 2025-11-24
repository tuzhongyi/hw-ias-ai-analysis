import { GpsTaskSampleRecord } from '../../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { IIdNameLocationModel } from '../../../../../../../../common/data-core/models/model.interface';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemMainMapAMapSampleMarkerIconController } from './system-main-map-amap-sample-marker-icon.controller';

export class SystemMainMapAMapSampleMarkerController extends IASMapAMapMarkerLabelAbstract<SystemMainMapAMapSampleMarkerItem> {
  constructor(data: GpsTaskSampleRecord) {
    super(new SystemMainMapAMapSampleMarkerItem(data));
    this.icon = this.init();
    this.out();
  }

  private _icon = new SystemMainMapAMapSampleMarkerIconController();

  init() {
    return {
      normal: this._icon.icon,
    };
  }
}

class SystemMainMapAMapSampleMarkerItem
  extends GpsTaskSampleRecord
  implements IIdNameLocationModel
{
  constructor(data: GpsTaskSampleRecord) {
    super();
    this.init(data);
  }

  private init(data: GpsTaskSampleRecord) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      (this as any)[key] = (data as any)[key];
    });
  }

  get Name(): string {
    return this.Address || '';
  }
}
