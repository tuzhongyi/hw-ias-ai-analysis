import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { RoadObjectEventType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { IconTool } from '../../../../../../../common/tools/icon-tool/icon.tool';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { SystemStatisticRoadObjectMapStateItemComponent } from '../system-statistic-road-object-map-state-item/system-statistic-road-object-map-state-item.component';
import { SystemStatisticRoadObjectMapStateItem } from '../system-statistic-road-object-map-state-item/system-statistic-road-object-map-state-item.model';

@Component({
  selector: 'ias-system-statistic-road-object-map-state-group',
  imports: [CommonModule, SystemStatisticRoadObjectMapStateItemComponent],
  templateUrl: './system-statistic-road-object-map-state-group.component.html',
  styleUrl: './system-statistic-road-object-map-state-group.component.less',
})
export class SystemStatisticRoadObjectMapStateGroupComponent
  implements OnInit, OnChanges
{
  @Input() source: RoadObjectEventRecord[] = [];
  @Input() view: RoadObjectEventRecord[] = [];
  @Input() deviceId?: string;
  @Output() selected = new EventEmitter<{
    EventType?: number;
    RoadObjectType?: number;
  }>();
  @Input() reset = false;
  @Output() resetChange = new EventEmitter<boolean>();
  constructor(private manager: Manager) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.change.source(changes['source']);
    this.change.view(changes['view']);
    this.change.reset(changes['reset']);
  }

  private change = {
    source: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.eventtype.load();
        this.objecttype.load();
      }
    },
    view: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.objecttype.refresh();
        this.eventtype.refresh();
      }
    },
    reset: (simple: SimpleChange) => {
      if (simple) {
        if (this.reset) {
          this.objecttype.selected = undefined;
          this.objecttype.refresh();
          this.eventtype.selected = undefined;
          this.eventtype.refresh();
          this.reset = false;
          this.resetChange.emit(false);
        }
      }
    },
  };

  filter() {
    let args = {
      EventType: this.eventtype.selected?.type,
      RoadObjectType: this.objecttype.selected?.type,
    };
    //  this.source.filter((item) => {
    //   // 处理eventtype：如果参数为空，则不参与筛选；否则匹配对应字段
    //   const isEventMatch = !args.EventType || item.EventType === args.EventType;
    //   // 处理objecttype：如果参数为空，则不参与筛选；否则匹配对应字段
    //   const isObjectMatch =
    //     !args.RoadObjectType || item.RoadObjectType === args.RoadObjectType;

    //   // 两个条件同时满足（空参数自动满足）
    //   return isEventMatch && isObjectMatch;
    // });
    this.selected.emit(args);
  }

  eventtype = {
    loaded: false,
    datas: [] as SystemStatisticRoadObjectMapStateItem[],
    selected: undefined as SystemStatisticRoadObjectMapStateItem | undefined,
    load: async () => {
      this.eventtype.datas = [];
      let enums = await this.manager.source.road.object.EventTypes.get();
      for (let i = 0; i < enums.length; i++) {
        let _enum = enums[i];
        let item = await this.eventtype.create.item(_enum.Value, _enum.Name);
        item.value = this.source.filter(
          (x) =>
            x.EventType == _enum.Value &&
            (!this.deviceId || x.DeviceId == this.deviceId)
        ).length;
        this.eventtype.datas.push(item);
      }
      this.eventtype.loaded = true;
    },
    refresh: () => {
      if (this.eventtype.selected) {
        this.eventtype.selected.value = this.view.filter((x) => {
          return (
            x.EventType == this.eventtype.selected?.type &&
            (!this.deviceId || x.DeviceId == this.deviceId)
          );
        }).length;
      } else {
        this.eventtype.datas.forEach((item) => {
          item.value = this.view.filter(
            (x) =>
              x.EventType == item.type &&
              (!this.deviceId || x.DeviceId == this.deviceId)
          ).length;
        });
      }
    },
    on: (data: SystemStatisticRoadObjectMapStateItem) => {
      if (this.eventtype.selected == data) {
        this.eventtype.selected = undefined;
      } else {
        this.eventtype.selected = data;
      }

      this.filter();
      this.objecttype.refresh();
    },
    create: {
      item: (type: RoadObjectEventType, name: string) => {
        let item = new SystemStatisticRoadObjectMapStateItem();
        item.name = name;
        item.type = type;

        item.icon = this.eventtype.create.icon(type);
        item.color =
          ObjectTool.model.RoadObjectEventRecord.get.color.event(type);

        return item;
      },
      icon: (type: RoadObjectEventType) => {
        switch (type) {
          case RoadObjectEventType.Inspection:
            return `mdi mdi-checkbox-marked-circle-outline`;
          case RoadObjectEventType.Breakage:
            return `mdi mdi-alert-outline`;
          case RoadObjectEventType.Disappear:
            return `mdi mdi-help-circle-outline`;

          default:
            return '';
        }
      },
    },
  };
  objecttype = {
    loaded: false,
    datas: [] as SystemStatisticRoadObjectMapStateItem[],
    selected: undefined as SystemStatisticRoadObjectMapStateItem | undefined,
    load: async () => {
      this.objecttype.datas = [];
      let enums = await this.manager.source.road.object.PointObjectTypes.get();
      for (let i = 0; i < enums.length; i++) {
        let _enum = enums[i];
        let item = await this.objecttype.create.item(_enum.Value, _enum.Name);
        item.name = _enum.Name;
        item.value = this.source.filter(
          (x) =>
            x.RoadObjectType == _enum.Value &&
            (!this.deviceId || x.DeviceId == this.deviceId)
        ).length;
        this.objecttype.datas.push(item);
      }
      this.objecttype.loaded = true;
    },
    refresh: () => {
      if (this.objecttype.selected) {
        this.objecttype.selected.value = this.view.filter(
          (x) =>
            x.RoadObjectType == this.objecttype.selected?.type &&
            (!this.deviceId || x.DeviceId == this.deviceId)
        ).length;
      } else {
        this.objecttype.datas.forEach((item) => {
          item.value = this.view.filter(
            (x) =>
              x.RoadObjectType == item.type &&
              (!this.deviceId || x.DeviceId == this.deviceId)
          ).length;
        });
      }
    },
    on: (data: SystemStatisticRoadObjectMapStateItem) => {
      if (this.objecttype.selected == data) {
        this.objecttype.selected = undefined;
      } else {
        this.objecttype.selected = data;
      }
      this.filter();
      this.eventtype.refresh();
    },
    create: {
      item: async (type: RoadObjectType, name: string) => {
        let item = new SystemStatisticRoadObjectMapStateItem();
        item.name = name;
        item.type = type;

        item.color =
          ObjectTool.model.RoadObjectEventRecord.get.color.object(type);

        item.icon = IconTool.RoadObjectType(type);

        return item;
      },
    },
  };
}
