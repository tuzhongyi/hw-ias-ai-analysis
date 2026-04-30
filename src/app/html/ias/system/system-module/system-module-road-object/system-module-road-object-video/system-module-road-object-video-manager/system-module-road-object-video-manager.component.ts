import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OptionMode } from '../../../../../../../common/data-core/enums/option.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  VideoCaptureModel,
  VideoDirective,
} from '../../../../../../../common/directives/video/video.directive';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { VideoTagsComponent } from '../../../../../share/video-tags/video-tags.component';
import { SystemModuleRoadObjectDetailsSimpleComponent } from '../../system-module-road-object-details/system-module-road-object-details-simple/system-module-road-object-details-simple.component';
import { SystemModuleRoadObjectVideoMapManagerComponent } from '../system-module-road-object-video-map/system-module-road-object-video-map-manager/system-module-road-object-video-map-manager.component';
import { SystemModuleRoadObjectVideoManagerBusiness } from './system-module-road-object-video-manager.business';
import {
  PickupLineModel,
  PickupModel,
  PickupPointModel,
  SystemModuleRoadObjectVideoManagerButton,
} from './system-module-road-object-video-manager.model';
import { SystemModuleRoadObjectVideoManagerSource } from './system-module-road-object-video-manager.source';

@Component({
  selector: 'ias-system-module-road-object-video-manager',
  imports: [
    CommonModule,
    FormsModule,
    VideoTagsComponent,
    SystemModuleRoadObjectVideoMapManagerComponent,
    SystemModuleRoadObjectDetailsSimpleComponent,
  ],
  templateUrl: './system-module-road-object-video-manager.component.html',
  styleUrl: './system-module-road-object-video-manager.component.less',
  providers: [
    SystemModuleRoadObjectVideoManagerSource,
    SystemModuleRoadObjectVideoManagerBusiness,
  ],
})
export class SystemModuleRoadObjectVideoManagerComponent implements OnInit {
  @Input() data?: FileInfo;
  @Input() objects: RoadObject[] = [];
  @Output() pickup = new EventEmitter<PickupModel>();
  @Output() close = new EventEmitter<void>();
  @Input() mode = OptionMode.create;

  @Output() details = new EventEmitter<RoadObject>();
  @Input() last = false;
  @Output() next = new EventEmitter<FileInfo>();
  @Output() reload = new EventEmitter<void>();

  constructor(
    public source: SystemModuleRoadObjectVideoManagerSource,
    private toastr: ToastrService
  ) {}

  OptionMode = OptionMode;
  selected?: RoadObject;
  ngOnInit(): void {
    this.on.type();
  }
  type = RoadObjectType.FireHydrant;

  video = {
    time: 0,
    element: undefined as VideoDirective | undefined,
    event: {
      load: new EventEmitter<FileInfo>(),
      time: new EventEmitter<number>(),
    },
    on: {
      update: (currentTime: number) => {
        this.video.event.time.emit(currentTime);
      },
      loaded: (data: VideoDirective) => {
        this.video.element = data;
      },
      next: () => {
        if (this.data) {
          this.next.emit(this.data);
        }
      },
    },
  };

  button = {
    type: new SystemModuleRoadObjectVideoManagerButton(),
    point: new SystemModuleRoadObjectVideoManagerButton(),
    line: {
      auto: {
        begin: new SystemModuleRoadObjectVideoManagerButton(),
        end: new SystemModuleRoadObjectVideoManagerButton(),
      },
      manual: {
        begin: new SystemModuleRoadObjectVideoManagerButton(),
        end: new SystemModuleRoadObjectVideoManagerButton(),
        pickup: new SystemModuleRoadObjectVideoManagerButton(),
      },
    },
  };

  map = {
    loaded: false,
    datas: [] as FileGpsItem[],
    course: 0,
    current: undefined as [number, number] | undefined,
    closest: undefined as FileGpsItem | undefined,
    on: {
      loaded: (datas: FileGpsItem[]) => {
        this.map.loaded = true;
        this.map.datas = datas;
        if (this.data) {
          this.video.event.load.emit(this.data);
        }
      },
      seek: (data: {
        start: FileGpsItem;
        end: FileGpsItem;
        percent: number;
      }) => {
        let start = data.start.OffsetTime.toSeconds();
        let end = data.end.OffsetTime.toSeconds();
        let timestamp = start + (end - start) * data.percent;
        if (this.video.time == timestamp) {
          this.video.time = 0;
          setTimeout(() => {
            this.video.time = timestamp;
          }, 0);
        } else {
          this.video.time = timestamp;
        }
        this.video.element?.pause();
      },
      error: (e: Error) => {
        this.toastr.error(e.message);
      },
      object: {
        dblclick: (data: RoadObject) => {
          this.details.emit(data);
        },
        click: (data: RoadObject) => {
          this.selected = data;
        },
      },
      current: (data: [number, number]) => {
        this.map.current = data;
      },
      closest: (data: FileGpsItem) => {
        this.map.closest = data;
      },
      course: (course: number) => {
        this.map.course = course;
      },
    },
  };

  on = {
    type: async () => {
      this.button.point.enabled =
        (await this.source.points).findIndex((x) => x.Value == this.type) >= 0;
      let line_enabled =
        (await this.source.lines).findIndex((x) => x.Value == this.type) >= 0;
      this.button.line.auto.begin.enabled = line_enabled;
      this.button.line.auto.end.enabled = line_enabled;
      this.button.line.manual.begin.enabled = line_enabled;
      this.button.line.manual.end.enabled = line_enabled;
      this.button.line.manual.pickup.enabled = line_enabled;

      this.button.point.display = true;

      this.button.line.auto.begin.display = true;
      this.button.line.auto.end.display = false;

      this.button.line.manual.begin.display = true;
      this.button.line.manual.end.display = false;
      this.button.line.manual.pickup.display = false;
    },
    ok: () => {
      if (this.video.element) {
        this.video.element.capture().then((x) => {
          if (this.map.current) {
            let point: PickupPointModel = {
              objecttype: this.type,
              type: 'point',
              point: this.map.current,
              capture: x,
              address: this.map.closest?.RoadName,
              course: this.map.course,
            };
            this.pickup.emit(point);
          }
        });
      }
    },
    close: () => {
      this.close.emit();
    },
    simple: {
      picture: undefined as VideoCaptureModel | undefined,
      capture: async () => {
        this.on.simple.picture = await this.video.element?.capture();
      },
      saved: () => {
        this.selected = undefined;
        this.reload.emit();
      },
    },
  };

  line = {
    pick: {
      begin: new EventEmitter<boolean>(),
      end: new EventEmitter<void>(),
      up: new EventEmitter<void>(),
    },

    auto: {
      begin: () => {
        this.button.line.auto.begin.display = false;
        this.button.line.auto.end.display = true;

        this.button.line.manual.begin.display = true;
        this.button.line.manual.end.display = false;
        this.button.line.manual.pickup.display = false;

        this.button.line.manual.begin.enabled = false;

        this.video.element?.pause();

        this.line.pick.begin.emit(true);
      },
      end: async () => {
        this.button.line.auto.begin.display = true;
        this.button.line.auto.end.display = false;

        this.button.line.manual.begin.display = true;
        this.button.line.manual.end.display = false;
        this.button.line.manual.pickup.display = false;

        this.button.line.manual.begin.enabled = true;

        this.line.pick.end.emit();
      },
    },
    manual: {
      begin: () => {
        this.button.line.auto.begin.display = true;
        this.button.line.auto.end.display = false;

        this.button.line.manual.begin.display = false;
        this.button.line.manual.end.display = true;
        this.button.line.manual.pickup.display = true;

        this.button.line.auto.begin.enabled = false;

        this.button.point.display = false;
        this.video.element?.pause();
        this.line.pick.begin.emit(false);
      },
      end: async () => {
        this.button.line.auto.begin.display = true;
        this.button.line.auto.end.display = false;

        this.button.line.manual.begin.display = true;
        this.button.line.manual.end.display = false;
        this.button.line.manual.pickup.display = false;

        this.button.line.auto.begin.enabled = true;

        this.button.point.display = true;

        this.line.pick.end.emit();
      },
      pick: () => {
        this.line.pick.up.emit();
      },
    },

    pickup: async (args: {
      points: [number, number][];
      auto: boolean;
      source?: RoadObject;
    }) => {
      if (this.video.element) {
        let line: PickupLineModel = {
          source: args.source,
          auto: args.auto,
          objecttype: this.type,
          type: 'line',
          line: args.points,
          capture: await this.video.element.capture(),
          address: this.map.closest?.RoadName,
          course: this.map.course,
        };
        this.pickup.emit(line);
      }
    },

    on: {
      click: (data: RoadObject) => {
        if (!this.video.element) return;
        if (!data.GeoLine) return;

        this.selected = data;
        this.type = data.ObjectType;
        this.on.type();

        this.video.element.pause();
        let polyline = this.map.datas.map<[number, number]>((x) => [
          x.Longitude,
          x.Latitude,
        ]);
        let end = data.GeoLine[data.GeoLine.length - 1];

        let closest = GeoTool.polyline.closest.get(polyline, [
          end.Longitude,
          end.Latitude,
        ]);

        if (closest) {
          let prov = this.map.datas[closest.segmentIndex];
          let next = this.map.datas[closest.segmentIndex + 1];
          let duration =
            next.OffsetTime.toSeconds() - prov.OffsetTime.toSeconds();
          let current =
            prov.OffsetTime.toSeconds() + duration * closest.percent.segment;
          this.video.time = current;
        }
      },
      dblclick: (data: RoadObject) => {
        this.details.emit(data);
      },
    },
  };
}
