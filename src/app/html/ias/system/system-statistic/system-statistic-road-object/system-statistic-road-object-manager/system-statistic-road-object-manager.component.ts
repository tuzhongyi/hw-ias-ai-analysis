import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/interface/page-list.model';
import { ScrollSnapDirective } from '../../../../../../common/directives/scroll/scroll-snap.directive';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemEventRoadObjectDetailsManagerComponent } from '../../../system-event/system-event-road-object/system-event-road-object-details/system-event-road-object-details-manager/system-event-road-object-details-manager.component';
import { SystemEventVideoComponent } from '../../../system-event/system-event-video/system-event-video.component';
import { SystemStatisticRoadObjectMapStateGroupComponent } from '../system-statistic-road-object-map-state/system-statistic-road-object-map-state-group/system-statistic-road-object-map-state-group.component';
import { SystemStatisticRoadObjectMapComponent } from '../system-statistic-road-object-map/system-statistic-road-object-map.component';
import { SystemStatisticRoadObjectTimelineSimpleComponent } from '../system-statistic-road-object-timeline-simple/system-statistic-road-object-timeline-simple.component';
import { SystemStatisticRoadObjectTimelineComponent } from '../system-statistic-road-object-timeline/system-statistic-road-object-timeline.component';
import { SystemStatisticRoadObjectManagerBusiness } from './system-statistic-road-object-manager.business';
import { SystemStatisticRoadObjectArgs } from './system-statistic-road-object-manager.model';
import { SystemStatisticRoadObjectManagerWindow } from './system-statistic-road-object-manager.window';

@Component({
  selector: 'ias-system-statistic-road-object-manager',
  imports: [
    CommonModule,
    FormsModule,
    ScrollSnapDirective,
    ContentHeaderComponent,
    DateTimeControlComponent,
    WindowComponent,
    SystemEventVideoComponent,
    PictureListComponent,
    HowellSelectComponent,
    SystemStatisticRoadObjectMapComponent,

    SystemStatisticRoadObjectTimelineComponent,
    SystemStatisticRoadObjectMapStateGroupComponent,
    SystemEventRoadObjectDetailsManagerComponent,
    SystemStatisticRoadObjectTimelineSimpleComponent,
    // SystemStatisticRoadObjectMapMarkerComponent,
    // SystemStatisticRoadObjectMapInfoDetailsComponent,
    // SystemStatisticRoadObjectMapInfoSimpleComponent,
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
    reset: false,
    record: {
      source: [] as RoadObjectEventRecord[],
      view: [] as RoadObjectEventRecord[],
      selected: undefined as RoadObjectEventRecord | undefined,
    },
    path: [] as FileGpsItem[][],
    channels: [] as EnumNameValue<number>[],
    device: {
      data: [] as MobileDevice[],
      selected: undefined as MobileDevice | undefined,
    },
  };

  map = {
    timeline: {
      simple: false,
    },
  };

  ngOnInit(): void {
    this.load.ing();
  }

  load = {
    ing: async () => {
      this.data.reset = true;
      await this.load.record();
      let deviceIds = this.data.record.source.map((x) => x.DeviceId);
      deviceIds = ArrayTool.distinct(deviceIds);
      if (deviceIds.length > 0) {
        let selectedId = deviceIds[0];

        this.load.device(deviceIds, selectedId);
        await this.load.view(deviceIds, selectedId);
        this.load.path(selectedId);
      } else {
        this.data.record.view = [];
        this.data.path = [];
        this.data.device.data = [];
      }
    },
    record: async () => {
      this.data.record.source = await this.business.record(this.args);
    },
    view: (deviceIds: string[], selectedId: string) => {
      if (deviceIds.length > 1) {
        this.data.record.view = this.data.record.source.filter(
          (x) => x.DeviceId === selectedId
        );
      } else {
        this.data.record.view = [...this.data.record.source];
      }
      return this.data.record.view;
    },
    device: async (deviceIds: string[], selectedId?: string) => {
      this.data.device.data = await this.business.devices(deviceIds);
      if (selectedId) {
        this.data.device.selected = this.data.device.data.find(
          (x) => x.Id === selectedId
        );
      }
    },
    path: (deviceId: string) => {
      this.business.path(deviceId, this.data.record.view).then((y) => {
        this.data.path = y;
      });
    },
  };

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
    device: async () => {
      if (this.data.device.selected) {
        let selectedId = this.data.device.selected.Id;
        let deviceIds = this.data.record.source.map((x) => x.DeviceId);
        await this.load.view(deviceIds, selectedId);
        this.load.path(selectedId);
      }
    },
    details: (data: RoadObjectEventRecord) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
    select: (data: RoadObjectEventRecord) => {
      this.data.record.selected = data;
    },
    filter: (args: { EventType?: number; RoadObjectType?: number }) => {
      this.data.record.view = this.data.record.source.filter((item) => {
        let is = {
          event: !args.EventType || item.EventType === args.EventType,
          object:
            !args.RoadObjectType || item.RoadObjectType === args.RoadObjectType,
          device:
            !this.data.device.selected ||
            item.DeviceId === this.data.device.selected.Id,
        };
        return is.event && is.object && is.device;
      });
      this.data.record.selected = undefined;
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
    wheel: {
      change: (e: WheelEvent) => {
        let element = e.currentTarget as HTMLDivElement;
        // 滚轮向下滚动（deltaY > 0）
        if (e.deltaY > 0) {
          element.scrollTo({
            top: element.scrollHeight, // 页面总高度
            behavior: 'smooth', // instant = 瞬间滚动，smooth = 平滑滚动
          });
        }
        // 滚轮向上滚动（deltaY < 0）
        else if (e.deltaY < 0) {
          element.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        } else {
        }
      },
      stop: (e: WheelEvent) => {
        e.stopPropagation();
      },
    },
    scroll: (e: Event) => {
      let element = e.currentTarget as HTMLDivElement;

      let max = element.scrollHeight - element.clientHeight;

      if (element.scrollTop <= 0) {
        this.map.timeline.simple = false;
      } else if (element.scrollTop >= max) {
        this.map.timeline.simple = true;
      }
    },
  };
}
