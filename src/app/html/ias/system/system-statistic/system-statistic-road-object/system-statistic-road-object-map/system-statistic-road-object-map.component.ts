import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { wait } from '../../../../../../common/tools/wait';
import { SystemStatisticRoadObjectMapController } from './controller/system-statistic-road-object-map.controller';

@Component({
  selector: 'ias-system-statistic-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map.component.html',
  styleUrl: './system-statistic-road-object-map.component.less',
  providers: [ComponentTool],
})
export class SystemStatisticRoadObjectMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() records: RoadObjectEventRecord[] = [];
  @Input() selected?: RoadObjectEventRecord;
  @Output() selectedChange = new EventEmitter<RoadObjectEventRecord>();

  @Input() path: FileGpsItem[][] = [];

  @Output() recorddblclick = new EventEmitter<RoadObjectEventRecord>();
  @Input() focus?: EventEmitter<void>;

  constructor(tool: ComponentTool, manager: Manager) {
    this.controller = new SystemStatisticRoadObjectMapController(
      tool,
      this.subscription,
      manager,
    );
  }

  private subscription = new Subscription();
  private controller: SystemStatisticRoadObjectMapController;
  private inited = false;
  private focusing = false;

  private load = {
    road: async () => {
      // let datas = await this.business.road();

      // let polylines = await this.controller.road.load(datas);
      // let center = await this.controller.map.focus(polylines);

      this.inited = true;
    },
    records: async () => {
      await this.controller.record.blur();
      await this.controller.record.clear();
      if (this.records.length > 0) {
        await this.controller.record.load(this.records);
      }
    },
    path: async () => {
      await this.controller.record.blur();
      await this.controller.path.clear();
      await this.controller.path.load(this.path, true);
    },
  };

  private change = {
    path: async (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        await wait(() => {
          return this.inited;
        });
        await this.load.path();
      }
    },
    records: async (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        await wait(() => {
          return this.inited;
        });
        await this.load.records();
      }
    },
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          this.controller.record.select(this.selected);
          let path = this.path.flat(1);
          path = ArrayTool.unique(path, (a, b) => {
            if (a.OSDTime && b.OSDTime) {
              return a.OSDTime.getTime() == b.OSDTime.getTime();
            }
            if (a.OffsetMilliseconds && b.OffsetMilliseconds) {
              return a.OffsetMilliseconds == b.OffsetMilliseconds;
            }
            if (a.OffsetTime && b.OffsetTime) {
              return (
                a.OffsetTime.toDate().getTime() ==
                b.OffsetTime.toDate().getTime()
              );
            }
            return a.Longitude == b.Longitude && a.Latitude == b.Latitude;
          });
          this.controller.path.to(path, this.selected);
        } else {
          this.controller.record.blur();
        }
      }
    },
  };

  ngOnInit(): void {
    this.load.road();
    this.load.records();
    this.regist.record();
    this.regist.focus();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    Promise.all([
      this.change.records(changes['records']),
      this.change.selected(changes['selected']),
      this.change.path(changes['path']),
    ]).then((x) => {
      if (this.focusing) {
        this.controller.map.focus();
        this.focusing = false;
      }
    });
  }

  private regist = {
    focus: () => {
      if (this.focus) {
        let sub = this.focus.subscribe((x) => {
          this.focusing = true;
        });
        this.subscription.add(sub);
      }
    },
    record: () => {
      this.controller.event.record.click = (data) => {
        this.selectedChange.emit(data);
      };
      this.controller.event.record.dblclick = (data) => {
        this.recorddblclick.emit(data);
      };
    },
  };
}
