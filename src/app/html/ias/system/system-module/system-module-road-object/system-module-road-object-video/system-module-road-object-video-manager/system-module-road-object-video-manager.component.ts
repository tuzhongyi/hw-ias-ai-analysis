import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { VideoDirective } from '../../../../../../../common/directives/video/video.directive';
import { VideoTagsComponent } from '../../../../../share/video-tags/video-tags.component';
import { SystemModuleRoadObjectVideoMapManagerComponent } from '../system-module-road-object-video-map/system-module-road-object-video-map-manager/system-module-road-object-video-map-manager.component';
import { SystemModuleRoadObjectVideoManagerBusiness } from './system-module-road-object-video-manager.business';
import { PickupModel } from './system-module-road-object-video-manager.model';

@Component({
  selector: 'ias-system-module-road-object-video-manager',
  imports: [
    CommonModule,
    VideoTagsComponent,
    SystemModuleRoadObjectVideoMapManagerComponent,
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
  @Output() finished = new EventEmitter<void>();
  @Output() details = new EventEmitter<RoadObject>();

  constructor(private toastr: ToastrService) {}

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
        this.video.event.time.emit(currentTime * 1000);
      },
      loaded: (data: VideoDirective) => {
        this.video.element = data;
      },
      finished: () => {
        this.finished.emit();
      },
    },
  };

  map = {
    loaded: false,
    datas: [] as FileGpsItem[],
    current: undefined as FileGpsItem | undefined,
    pickup: undefined as [number, number] | undefined,
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
        this.video.time = timestamp;
      },
      error: (e: Error) => {
        this.toastr.error(e.message);
      },
      current: (item: FileGpsItem) => {
        this.map.current = item;
      },
      pickup: (data: [number, number]) => {
        this.map.pickup = data;
      },
      object: {
        dblclick: (data: RoadObject) => {
          this.details.emit(data);
        },
      },
    },
  };

  on = {
    ok: () => {
      if (this.video.element) {
        this.video.element.capture().then((x) => {
          if (this.map.pickup) {
            this.pickup.emit({
              position: this.map.pickup,
              capture: x,
              address: this.map.current?.RoadName,
            });
          }
        });
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
