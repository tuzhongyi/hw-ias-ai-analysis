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
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { wait } from '../../../../../../common/tools/wait';
import { SystemStatisticRoadObjectMapController } from './controller/system-statistic-road-object-map.controller';
import { SystemStatisticRoadObjectMapBusiness } from './system-statistic-road-object-map.business';

@Component({
  selector: 'ias-system-statistic-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map.component.html',
  styleUrl: './system-statistic-road-object-map.component.less',
  providers: [ComponentTool, SystemStatisticRoadObjectMapBusiness],
})
export class SystemStatisticRoadObjectMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() records: RoadObjectEventRecord[] = [];
  @Input() selected?: RoadObjectEventRecord;
  @Output() selectedChange = new EventEmitter<RoadObjectEventRecord>();

  @Input() path: FileGpsItem[] = [];

  @Output() recorddblclick = new EventEmitter<RoadObjectEventRecord>();

  constructor(
    private business: SystemStatisticRoadObjectMapBusiness,
    tool: ComponentTool
  ) {
    this.controller = new SystemStatisticRoadObjectMapController(
      tool,
      this.subscription
    );
  }

  private subscription = new Subscription();
  private controller: SystemStatisticRoadObjectMapController;
  private inited = false;

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
        this.controller.record.load(this.records);
      }
    },
    path: async () => {
      await this.controller.record.blur();
      await this.controller.path.clear();
      this.controller.path.load(this.path, true);
    },
  };

  private change = {
    records: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        wait(() => {
          return this.inited;
        }).then(() => {
          this.load.records();
        });
      }
    },
    selected: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.selected) {
          this.controller.record.select(this.selected);
          this.controller.path.to(this.path, this.selected);
        } else {
          this.controller.record.blur();
        }
      }
    },
    path: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        wait(() => {
          return this.inited;
        }).then(() => {
          this.load.path();
        });
      }
    },
  };

  ngOnInit(): void {
    this.load.road();
    this.load.records();
    this.regist.record();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.records(changes['records']);
    this.change.selected(changes['selected']);
    this.change.path(changes['path']);
  }

  private regist = {
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
