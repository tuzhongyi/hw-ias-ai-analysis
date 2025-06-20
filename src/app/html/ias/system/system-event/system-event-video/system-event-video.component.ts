import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ArmEventType } from '../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import {
  MapMarker,
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../share/map/ias-map.model';
import { VideoPathComponent } from '../../../share/video-path/component/video-path.component';
import { SystemEventVideoBusiness } from './business/system-event-video.business';

@Component({
  selector: 'ias-system-event-video',
  imports: [CommonModule, VideoPathComponent],
  templateUrl: './system-event-video.component.html',
  styleUrl: './system-event-video.component.less',
  providers: [SystemEventVideoBusiness],
})
export class SystemEventVideoComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  constructor(private business: SystemEventVideoBusiness) {}

  src?: string;
  map = {
    items: [] as FileGpsItem[],
    loading: false,
    points: [] as GisPoint[],
    args: new MapMarker(),
  };
  count = 5;

  ngOnInit(): void {
    if (this.data) {
      this.src = this.business.file(this.data.Id);
      this.load.path(this.data.Id);
      this.load.point(this.data);
    }
  }

  load = {
    point: (data: MobileEventRecord) => {
      let args = new MapMarker();
      args.type = MapMarkerType.shop;
      switch (data.EventType) {
        case ArmEventType.ShopSignDisappeared:
          args.color = MapMarkerShopColor.orange;
          break;
        case ArmEventType.ShopSignCreated:
          args.color = MapMarkerShopColor.green;
          break;

        default:
          break;
      }
      this.map.args = args;

      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        if (resource.Location) {
          this.map.points = [resource.Location];
        }
      }
    },
    path: (id: string) => {
      this.map.loading = true;
      this.business
        .load(id)
        .then((items) => {
          this.map.items = items;
          this.map.loading = false;
        })
        .catch((e) => {
          if (e.status === 404) {
            if (this.count > 0) {
              this.count--;
              setTimeout(() => {
                this.load.path(id);
              }, 1000);
            } else {
              this.map.loading = false;
            }
          }
        });
    },
  };
}
