import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { IIdNameLocationModel } from '../../../../../../../../common/data-core/models/model.interface';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemMainMapAMapAlarmMarkerIconController } from './system-main-map-amap-alarm-marker-icon.controller';

export class SystemMainMapAMapAlarmMarkerController extends IASMapAMapMarkerLabelAbstract<SystemMainMapAMapAlarmMarkerItem> {
  constructor(data: MobileEventRecord) {
    super(new SystemMainMapAMapAlarmMarkerItem(data));
    this.icon = this.init();
    this.out();
  }

  private _icon = new SystemMainMapAMapAlarmMarkerIconController();

  init() {
    return {
      normal: this._icon.icon,
    };
  }
}

class SystemMainMapAMapAlarmMarkerItem
  extends MobileEventRecord
  implements IIdNameLocationModel
{
  constructor(data: MobileEventRecord) {
    super();
    this.init(data);
  }

  private init(data: MobileEventRecord) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      (this as any)[key] = (data as any)[key];
    });
  }

  get Name(): string {
    return ObjectTool.model.MobileEventRecord.get.name(this);
  }
}
