import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OptionMode } from '../../../../../../../common/data-core/enums/option.enum';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import {
  VideoCaptureModel,
  VideoDirective,
} from '../../../../../../../common/directives/video/video.directive';
import { VideoTagsComponent } from '../../../../../share/video-tags/video-tags.component';
import { SystemModuleRoadObjectDetailsSimpleComponent } from '../../system-module-road-object-details/system-module-road-object-details-simple/system-module-road-object-details-simple.component';
import { SystemModuleRoadObjectVideoMapManagerComponent } from '../system-module-road-object-video-map/system-module-road-object-video-map-manager/system-module-road-object-video-map-manager.component';
import { SystemModuleRoadObjectVideoManagerBusiness } from './system-module-road-object-video-manager.business';
import { PickupModel } from './system-module-road-object-video-manager.model';

@Component({
  selector: 'ias-system-module-road-object-video-manager',
  imports: [
    CommonModule,
    VideoTagsComponent,
    SystemModuleRoadObjectVideoMapManagerComponent,
    SystemModuleRoadObjectDetailsSimpleComponent,
  ],
  templateUrl: './system-module-road-object-video-manager.component.html',
  styleUrl: './system-module-road-object-video-manager.component.less',
  providers: [SystemModuleRoadObjectVideoManagerBusiness],
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

  constructor(private toastr: ToastrService) {}
  OptionMode = OptionMode;
  selected?: RoadObject;
  ngOnInit(): void {}

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
    ok: () => {
      if (this.video.element) {
        this.video.element.capture().then((x) => {
          if (this.map.current) {
            this.pickup.emit({
              position: this.map.current,
              capture: x,
              address: this.map.closest?.RoadName,
              course: this.map.course,
            });
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
}
