import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/interface/page-list.model';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemEventRoadObjectDetailsManagerComponent } from '../../../system-event/system-event-road-object/system-event-road-object-details/system-event-road-object-details-manager/system-event-road-object-details-manager.component';
import { SystemEventVideoComponent } from '../../../system-event/system-event-video/system-event-video.component';
import { SystemStatisticRoadObjectMapMarkerComponent } from '../system-statistic-road-object-map-marker/system-statistic-road-object-map-marker.component';
import { SystemStatisticRoadObjectMapStateGroupComponent } from '../system-statistic-road-object-map-state/system-statistic-road-object-map-state-group/system-statistic-road-object-map-state-group.component';
import { SystemStatisticRoadObjectMapComponent } from '../system-statistic-road-object-map/system-statistic-road-object-map.component';
import { SystemStatisticRoadObjectTimelineComponent } from '../system-statistic-road-object-timeline/system-statistic-road-object-timeline.component';
import { SystemStatisticRoadObjectManagerBusiness } from './system-statistic-road-object-manager.business';
import { SystemStatisticRoadObjectArgs } from './system-statistic-road-object-manager.model';
import { SystemStatisticRoadObjectManagerWindow } from './system-statistic-road-object-manager.window';

@Component({
  selector: 'ias-system-statistic-road-object-manager',
  imports: [
    CommonModule,
    FormsModule,
    ContentHeaderComponent,
    DateTimeControlComponent,
    WindowComponent,
    SystemEventVideoComponent,
    PictureListComponent,
    HowellSelectComponent,
    SystemStatisticRoadObjectMapComponent,
    SystemStatisticRoadObjectMapMarkerComponent,
    SystemStatisticRoadObjectTimelineComponent,
    SystemStatisticRoadObjectMapStateGroupComponent,
    SystemEventRoadObjectDetailsManagerComponent,
  ],
  templateUrl: './system-statistic-road-object-manager.component.html',
  styleUrl: './system-statistic-road-object-manager.component.less',
  providers: [SystemStatisticRoadObjectManagerBusiness],
})
export class SystemStatisticRoadObjectManagerComponent implements OnInit {
  constructor(
    private business: SystemStatisticRoadObjectManagerBusiness,
    private language: LanguageTool
  ) {}

  window = new SystemStatisticRoadObjectManagerWindow();
  args = new SystemStatisticRoadObjectArgs();
  get title() {
    return `${formatDate(
      this.args.date,
      Language.YearMonthDay,
      'en'
    )}巡检线路统计`;
  }

  data = {
    record: {
      source: [] as RoadObjectEventRecord[],
      view: [] as RoadObjectEventRecord[],
    },
    path: [] as FileGpsItem[],
    channels: [] as EnumNameValue<number>[],
  };

  selected?: RoadObjectEventRecord;

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.record(this.args).then((x) => {
      this.data.record.source = x;
      this.data.record.view = x;

      let deviceIds = this.data.record.source.map((x) => x.DeviceId);
      deviceIds = ArrayTool.distinct(deviceIds);
      console.log('deviceIds', deviceIds);
      if (deviceIds.length > 0) {
        this.business.path(deviceIds[0], this.args).then((y) => {
          this.data.path = y;
        });
      }
    });
  }

  picture = {
    datas: [] as Array<
      RoadObjectEventRecord | EventResourceContent | RoadObject
    >,
    open: (
      paged: PagedList<
        RoadObjectEventRecord | EventResourceContent | RoadObject
      >,
      opened: boolean = false
    ) => {
      if (paged.Data.length == 0) return;

      this.picture.datas = paged.Data;

      this.window.picture.page = paged.Page;
      let index = paged.Page.PageIndex - 1;
      let data = paged.Data[index];
      this.window.picture.set(data);
      if (!opened) {
        this.window.picture.show = true;
      }
    },
    change: (page: Page) => {
      this.window.picture.page = page;
      let index = page.PageIndex - 1;
      let data = this.picture.datas[index];
      this.window.picture.set(data);
    },
  };

  on = {
    details: (data: RoadObjectEventRecord) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
    select: (data: RoadObjectEventRecord) => {
      this.selected = data;
    },
    filter: (args: { EventType?: number; RoadObjectType?: number }) => {
      this.data.record.view = this.data.record.source.filter((item) => {
        // 处理eventtype：如果参数为空，则不参与筛选；否则匹配对应字段
        const isEventMatch =
          !args.EventType || item.EventType === args.EventType;
        // 处理objecttype：如果参数为空，则不参与筛选；否则匹配对应字段
        const isObjectMatch =
          !args.RoadObjectType || item.RoadObjectType === args.RoadObjectType;

        // 两个条件同时满足（空参数自动满足）
        return isEventMatch && isObjectMatch;
      });
      this.selected = undefined;
    },
    video: async (data: RoadObjectEventRecord) => {
      let name = await this.language.event.EventType(data.EventType);
      this.window.video.title = `${name}`;
      this.data.channels =
        data.Resources?.map((x) => {
          let channel = new EnumNameValue<number>();
          channel.Name = x.ResourceName;
          channel.Value = x.PositionNo ?? 0;
          return channel;
        }) ?? [];
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.window.video.title = `${resource.ResourceName} ${name}`;
        // this.window.video.args.channel = resource.PositionNo;
      }
      this.window.video.data = data;
      this.window.video.show = true;
    },
  };
}
