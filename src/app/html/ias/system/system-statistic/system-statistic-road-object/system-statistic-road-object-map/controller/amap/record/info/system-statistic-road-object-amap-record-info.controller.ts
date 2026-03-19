import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ComponentTool } from '../../../../../../../../../../common/tools/component-tool/component.tool';
import { SystemStatisticRoadObjectMapInfoComponent } from '../../../../../system-statistic-road-object-map-info/system-statistic-road-object-map-info.component';

export class SystemStatisticRoadObjectAMapRecordInfoController {
  details?: (data: RoadObjectEventRecord) => void;
  constructor(
    private map: AMap.Map,
    private tool: ComponentTool,
    private subscription: Subscription
  ) {
    this.window = this.init();
    this.regist();
  }
  private window: AMap.InfoWindow;
  private event = {
    close: new EventEmitter<void>(),
    details: new EventEmitter<RoadObjectEventRecord>(),
  };

  private init() {
    let window = new AMap.InfoWindow({
      isCustom: true,
      anchor: 'bottom-center',
      offset: [0, -20],
      autoMove: false,
    });
    window.hide();
    return window;
  }
  private regist() {
    let sub_close = this.event.close.subscribe(() => {
      this.window.close();
    });
    this.subscription.add(sub_close);
    let sub_details = this.event.details.subscribe((data) => {
      this.details && this.details(data);
    });
    this.subscription.add(sub_details);
  }

  private get = {
    html: (data: RoadObjectEventRecord) => {
      let component = this.tool.create(
        SystemStatisticRoadObjectMapInfoComponent,
        { data: data, close: this.event.close, details: this.event.details }
      );
      let html = this.tool.get.html(component);
      return html.firstElementChild as HTMLElement;
    },
  };

  open(data: RoadObjectEventRecord) {
    if (data.Location) {
      let position = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ] as [number, number];

      this.window.setContent(this.get.html(data));
      this.window.open(this.map, position);
    }
  }

  close() {
    this.window.close();
  }
}
