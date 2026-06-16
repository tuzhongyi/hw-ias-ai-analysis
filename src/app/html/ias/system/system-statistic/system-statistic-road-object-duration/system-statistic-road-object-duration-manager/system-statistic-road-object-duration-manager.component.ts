import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { EventResourceContent } from '../../../../../../common/data-core/models/arm/event/event-resource-content.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/interface/page-list.model';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemEventRoadObjectDetailsManagerComponent } from '../../../system-event/system-event-road-object/system-event-road-object-details/system-event-road-object-details-manager/system-event-road-object-details-manager.component';
import { SystemEventVideoComponent } from '../../../system-event/system-event-video/system-event-video.component';
import { SystemStatisticRoadObjectManagerWindow } from '../../system-statistic-road-object/system-statistic-road-object-manager/system-statistic-road-object-manager.window';
import { SystemStatisticRoadObjectMapStateGroupComponent } from '../../system-statistic-road-object/system-statistic-road-object-map-state/system-statistic-road-object-map-state-group/system-statistic-road-object-map-state-group.component';
import { SystemStatisticRoadObjectMapComponent } from '../../system-statistic-road-object/system-statistic-road-object-map/system-statistic-road-object-map.component';
import { SystemStatisticRoadObjectTimelineDaysComponent } from '../../system-statistic-road-object/system-statistic-road-object-timeline-days/system-statistic-road-object-timeline-days.component';
import { SystemStatisticRoadObjectDurationBusiness } from '../system-statistic-road-object-duration.business';
import { SystemStatisticRoadObjectDurationArgs } from '../system-statistic-road-object-duration.model';

@Component({
  selector: 'ias-system-statistic-road-object-duration-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    WindowComponent,
    SystemEventVideoComponent,
    PictureListComponent,
    HowellSelectComponent,
    SystemStatisticRoadObjectMapComponent,

    SystemStatisticRoadObjectMapStateGroupComponent,
    SystemEventRoadObjectDetailsManagerComponent,
    SystemStatisticRoadObjectTimelineDaysComponent,
  ],
  templateUrl: './system-statistic-road-object-duration-manager.component.html',
  styleUrl: './system-statistic-road-object-duration-manager.component.less',
  providers: [SystemStatisticRoadObjectDurationBusiness],
})
export class SystemStatisticRoadObjectDurationManagerComponent implements OnInit {
  constructor(
    private business: SystemStatisticRoadObjectDurationBusiness,
    private language: LanguageTool,
  ) {}

  window = new SystemStatisticRoadObjectManagerWindow();
  args = new SystemStatisticRoadObjectDurationArgs();

  data = {
    reset: false,
    record: {
      source: [] as RoadObjectEventRecord[],
      view: [] as RoadObjectEventRecord[],
      selected: undefined as RoadObjectEventRecord | undefined,
    },
    channels: [] as EnumNameValue<number>[],
    device: {
      data: [] as MobileDevice[],
      selected: undefined as MobileDevice | undefined,
    },
  };

  map = {
    focus: new EventEmitter<void>(),
  };

  ngOnInit(): void {
    this.load.ing();
  }

  load = {
    ing: async () => {
      // this.data.reset = true;
      await this.load.record();
      let deviceIds = this.data.record.source.map((x) => x.DeviceId);
      deviceIds = ArrayTool.distinct(deviceIds);
      if (deviceIds.length > 0) {
        this.load.device(deviceIds);
        await this.load.view(deviceIds);
        this.map.focus.emit();
      } else {
        this.data.record.view = [];
        this.data.device.data = [];
      }
    },
    record: async () => {
      this.data.record.source = await this.business.record(this.args);
    },
    view: async (deviceIds: string[], selectedId?: string) => {
      if (deviceIds.length > 1 && selectedId) {
        this.data.record.view = this.data.record.source.filter(
          (x) => x.DeviceId === selectedId,
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
          (x) => x.Id === selectedId,
        );
      }
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
      opened: boolean = false,
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
    search: () => {
      this.load.ing();
    },
    device: async () => {
      let deviceIds = this.data.record.source.map((x) => x.DeviceId);
      if (this.data.device.selected) {
        let selectedId = this.data.device.selected.Id;
        await this.load.view(deviceIds, selectedId);
      } else {
        await this.load.view(deviceIds);
      }
      this.map.focus.emit();
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
      this.data.channels =
        data.Resources?.map((x) => {
          let channel = new EnumNameValue<number>();
          channel.Name = x.ResourceName;
          channel.Value = x.PositionNo ?? 0;
          return channel;
        }) ?? [];
      this.window.video.open(data, name);
    },
  };
}
