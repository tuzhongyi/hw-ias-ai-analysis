import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ComponentTool } from '../../../../../../../../../../common/tools/component-tool/component.tool';
import { SystemStatisticRoadObjectMapInfoDetailsComponent } from '../../../../../system-statistic-road-object-map-info/system-statistic-road-object-map-info-details/system-statistic-road-object-map-info-details.component';

export class SystemStatisticRoadObjectAMapRecordInfoDetailsController {
  details?: (data: RoadObjectEventRecord) => void;
  select?: (data: RoadObjectEventRecord) => void;
  opened(data: RoadObjectEventRecord) {
    if (this.datas.length > 0) {
      let index = this.datas.findIndex((x) => x.Id == data.Id);
      if (index >= 0) {
        return this.window.getIsOpen();
      }
    }
    return false;
  }
  constructor(
    private map: AMap.Map,
    private tool: ComponentTool,
    private subscription: Subscription,
  ) {
    this.window = this.init();
    this.regist();
  }
  private window: AMap.InfoWindow;
  private event = {
    close: new EventEmitter<void>(),
    details: new EventEmitter<RoadObjectEventRecord>(),
    select: new EventEmitter<RoadObjectEventRecord>(),
  };
  private datas: RoadObjectEventRecord[] = [];

  private init() {
    let window = new AMap.InfoWindow({
      isCustom: true,
      anchor: 'middle-left',
      offset: [25, -32],
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
    let sub_select = this.event.select.subscribe((data) => {
      this.select && this.select(data);
    });
    this.subscription.add(sub_details);
  }

  private get = {
    html: (datas: RoadObjectEventRecord[]) => {
      let component = this.tool.create(
        SystemStatisticRoadObjectMapInfoDetailsComponent,
        {
          datas: datas,
          close: this.event.close,
          details: this.event.details,
          select: this.event.select,
        },
      );
      let html = this.tool.get.html(component);
      return html.firstElementChild as HTMLElement;
    },
    offset: (isline: boolean): AMap.Pixel => {
      if (isline) {
        return new AMap.Pixel(25, 0);
      } else {
        return new AMap.Pixel(25, -32);
      }
    },
  };

  async open(datas: RoadObjectEventRecord[], isline: boolean) {
    this.datas = [...datas];
    if (datas.length > 0) {
      let last = datas[datas.length - 1];
      if (last.Location) {
        let position = [
          last.Location.GCJ02.Longitude,
          last.Location.GCJ02.Latitude,
        ] as [number, number];
        let offset = await this.get.offset(isline);
        this.window.setOffset(offset);
        this.window.setContent(this.get.html(datas));
        this.window.open(this.map, position);
      }
    }
  }

  close() {
    this.window.close();
  }
}
