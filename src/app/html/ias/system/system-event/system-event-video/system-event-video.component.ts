import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ArmEventType } from '../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import {
  MapMarker,
  MapMarkerColor,
  MapMarkerType,
} from '../../../share/map/ias-map.model';
import { VideoPathComponent } from '../../../share/video-path/component/video-path.component';
import { SystemEventVideoBusiness } from './business/system-event-video.business';
import { SystemEventVideoArgs } from './system-event-video.model';

@Component({
  selector: 'ias-system-event-video',
  imports: [CommonModule, VideoPathComponent],
  templateUrl: './system-event-video.component.html',
  styleUrl: './system-event-video.component.less',
  providers: [SystemEventVideoBusiness],
})
export class SystemEventVideoComponent implements OnInit, OnChanges {
  @Input() data?: MobileEventRecord;
  @Input() args: SystemEventVideoArgs = {};
  constructor(private business: SystemEventVideoBusiness) {}

  src?: string;
  map = {
    items: [] as FileGpsItem[],
    loading: false,
    points: [] as GisPoint[],
    args: new MapMarker(),
    rectified: {
      value: false,
      change: (value: boolean) => {
        this.map.rectified.value = value;
        this.args.rectified = value;
        if (this.data) {
          this.load.path(this.data.Id, this.args);
        }
      },
    },
  };
  count = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['args'] && !changes['args'].firstChange) {
      if (this.data) {
        this.src = this.business.file(this.data.Id, this.args);
      }
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.src = this.business.file(this.data.Id, this.args);
      this.load.path(this.data.Id, this.args);
      this.load.point(this.data);
    }
  }

  load = {
    point: (data: MobileEventRecord) => {
      let args = new MapMarker();

      switch (data.EventType) {
        case ArmEventType.ShopSignDisappeared:
          args.color = MapMarkerColor.orange;
          args.type = MapMarkerType.shop;
          break;
        case ArmEventType.ShopSignCreated:
          args.color = MapMarkerColor.green;
          args.type = MapMarkerType.shop;
          break;

        default:
          break;
      }
      this.map.args = args;

      if (data.Location) {
        this.map.points = [data.Location.GCJ02];
      }
    },
    path: (id: string, args: SystemEventVideoArgs) => {
      this.map.loading = true;
      this.business
        .load(id, args)
        .then((items) => {
          this.map.items = items;
          this.map.loading = false;
        })
        .catch((e) => {
          if (e.status === 404) {
            if (this.count > 0) {
              this.count--;
              setTimeout(() => {
                this.load.path(id, args);
              }, 1000);
            } else {
              this.map.loading = false;
            }
          } else {
            this.map.loading = false;
          }
        });
    },
  };
}
