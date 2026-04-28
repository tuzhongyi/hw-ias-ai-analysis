import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Language } from '../../../../../../../../common/tools/language-tool/language';
import { IIASMapCurrent } from '../../../../../../share/map/ias-map.model';
import { SystemModuleRoadObjectVideoMapContainerComponent } from '../system-module-road-object-video-map-container/system-module-road-object-video-map-container.component';
import { SystemModuleRoadObjectVideoMapPositionComponent } from '../system-module-road-object-video-map-position/system-module-road-object-video-map-position.component';
import { SystemModuleRoadObjectVideoMapSettingsComponent } from '../system-module-road-object-video-map-settings/system-module-road-object-video-map-settings.component';

@Component({
  selector: 'ias-system-module-road-object-video-map-manager',
  imports: [
    CommonModule,
    SystemModuleRoadObjectVideoMapContainerComponent,
    SystemModuleRoadObjectVideoMapSettingsComponent,
    SystemModuleRoadObjectVideoMapPositionComponent,
  ],
  templateUrl: './system-module-road-object-video-map-manager.component.html',
  styleUrl: './system-module-road-object-video-map-manager.component.less',
})
export class SystemModuleRoadObjectVideoMapManagerComponent
  implements OnInit, OnDestroy
{
  @Input() objects: RoadObject[] = [];
  @Input() data?: FileInfo;
  @Input() to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<{
    start: FileGpsItem;
    end: FileGpsItem;
    percent: number;
  }>();
  @Output() loaded = new EventEmitter<FileGpsItem[]>();
  @Output() error = new EventEmitter<Error>();

  @Input() locationable = false;
  @Input() pickupable = true;
  @Input() roadable = true;

  @Output('current') _current = new EventEmitter<[number, number]>();
  @Output('closest') _closest = new EventEmitter<FileGpsItem>();
  @Output() objectdblclick = new EventEmitter<RoadObject>();
  @Output() objectclick = new EventEmitter<RoadObject>();
  @Output() course = new EventEmitter<number>();
  @Input() linepickbegin?: EventEmitter<boolean>;
  @Input() linepickend?: EventEmitter<void>;
  @Input() linepick?: EventEmitter<void>;
  @Output() linepickup = new EventEmitter<{
    points: [number, number][];
    auto: boolean;
  }>();
  @Output() lineclick = new EventEmitter<RoadObject>();

  constructor() {}

  rectified = false;
  position = {
    current: {
      fixed: false,
      data: undefined as [number, number] | undefined,
    },
    pickup: {
      fixed: false,
      data: undefined as [number, number] | undefined,
    },
  };
  closest?: FileGpsItem;
  current?: [number, number];
  display = {
    point: true,
    line: true,
    route: true,
  };

  Language = Language;

  private subscription = new Subscription();

  private regist = {
    all: () => {
      this.regist.line.pick.begin();
      this.regist.line.pick.end();
      this.regist.line.pick.up();
    },
    line: {
      pick: {
        begin: () => {
          if (this.linepickbegin) {
            let sub = this.linepickbegin.subscribe((x) => {
              this.display.line = false;
              this.display.point = false;
              this.display.route = false;
              this.line.auto = x;
              this.line.creation = [];
              this.line.datas = [];
              this.line.picking = true;
              if (!this.line.auto) {
                this.line.up = true;
              }
            });
            this.subscription.add(sub);
          }
        },
        end: () => {
          if (this.linepickend) {
            let sub = this.linepickend.subscribe(() => {
              this.display.line = true;
              this.display.point = true;
              this.display.route = true;
              this.line.picking = false;
              this.linepickup.emit({
                points: this.line.creation,
                auto: this.line.auto,
              });
            });
            this.subscription.add(sub);
          }
        },
        up: () => {
          if (this.linepick) {
            let sub = this.linepick.subscribe(() => {
              this.line.up = true;
            });
            this.subscription.add(sub);
          }
        },
      },
    },
  };

  ngOnInit(): void {
    this.regist.all();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    trigger: (data: {
      start: FileGpsItem;
      end: FileGpsItem;
      percent: number;
    }) => {
      this.trigger.emit(data);
    },
    loaded: (datas: FileGpsItem[]) => {
      this.loaded.emit(datas);
    },
    error: (e: Error) => {
      this.error.emit(e);
    },

    closest: (item: FileGpsItem) => {
      this.closest = item;
      this._closest.emit(item);
    },
    course: (value: number) => {
      this.course.emit(value);
    },
    current: (data: IIASMapCurrent) => {
      this.current = data.position;
      this._current.emit(data.position);
      if (this.line.picking) {
        if (this.line.auto) {
          this.line.push(data);
        } else {
          if (this.line.up) {
            this.line.push(data);
            this.line.up = false;
          }
        }
      }
    },
    object: {
      dblclick: (data: RoadObject) => {
        this.objectdblclick.emit(data);
      },
      click: (data: RoadObject) => {
        this.objectclick.emit(data);
      },
    },
  };

  line = {
    picking: false,
    auto: false,
    up: false,
    creation: [] as [number, number][],
    datas: [] as IIASMapCurrent[],
    create: new EventEmitter<[number, number][]>(),
    push: (data: IIASMapCurrent) => {
      this.line.datas = this.line.datas.filter((item) => {
        const time = Number(item.timestamp);
        // 过滤掉 NaN、无效时间戳，只保留合法且 <= 当前时间戳的值
        return !isNaN(time) && time <= data.timestamp;
      });

      this.line.datas.push(data);

      this.line.creation = this.line.datas.map((x) => x.position);

      this.line.create.emit(this.line.creation);
    },
    on: {
      click: (data: RoadObject) => {
        this.lineclick.emit(data);
      },
    },
  };
}
