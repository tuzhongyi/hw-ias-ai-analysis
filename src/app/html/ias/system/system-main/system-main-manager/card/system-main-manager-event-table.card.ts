import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { EventMode } from '../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainManagerComponent } from '../system-main-manager.component';

export class SystemMainManagerCardEventTable {
  mode = EventMode.gpstask;
  modeable = false;
  constructor(private that: SystemMainManagerComponent) {}

  on = {
    // loaded: (datas: MobileEventRecord[]) => {
    //   this.realtime.datas = datas.filter((x) => !x.Assignment?.Assigned);
    // },
    position: (data: MobileEventRecord | GpsTaskSampleRecord) => {
      if (!data.Location) {
        this.that.toastr.warning('位置为空，无法定位');
        return;
      }
      // this.that.map.moveto.emit(data);

      this.that.map.select.emit(data);
    },
    details: (data: MobileEventRecord | GpsTaskSampleRecord) => {
      if (data instanceof MobileEventRecord) {
        this.that.window.details.mobile.open(data, this.list());
      } else if (data instanceof GpsTaskSampleRecord) {
        this.that.window.details.sample.data = data;
        this.that.window.details.sample.show = true;
      }
    },
  };

  /** 翻页要跟表格当前显示的是同一份列表，不然会翻到表里没有的记录上 */
  private list(): MobileEventRecord[] {
    switch (this.mode) {
      case EventMode.shop:
        return this.that.shop.data.record;
      case EventMode.realtime:
        return this.that.realtime.datas;
      default:
        return [];
    }
  }
}
