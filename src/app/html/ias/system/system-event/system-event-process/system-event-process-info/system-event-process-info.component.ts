import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { IASMapComponent } from '../../../../share/map/ias-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../../share/map/ias-map.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';

@Component({
  selector: 'ias-system-event-process-info',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    PicturePolygonMultipleComponent,

    SystemEventRecordDetailsComponent,
    IASMapComponent,
  ],
  templateUrl: './system-event-process-info.component.html',
  styleUrl: './system-event-process-info.component.less',
})
export class SystemEventProcessInfoComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Input() registration?: ShopRegistration;
  @Output() picture = new EventEmitter<
    PagedList<MobileEventRecord | ShopRegistration>
  >();

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
    }
    if (this.registration) {
      this.map.point = this.registration.Location;
    }
  }
  load = {
    picture: (data: MobileEventRecord) => {
      if (data && data.Resources) {
        let page = Page.create(1, 1, data.Resources.length);
        this.record.picture.page.change(page);
      }
    },
    map: (data: MobileEventRecord) => {
      switch (data.EventType) {
        case 8:
          this.map.marker.type = MapMarkerType.shop;
          this.map.marker.color = MapMarkerShopColor.blue;
          break;
        case 9:
          this.map.marker.type = MapMarkerType.shop;
          this.map.marker.color = MapMarkerShopColor.green;
          break;

        default:
          break;
      }
    },
  };

  map = {
    marker: {
      type: MapMarkerType.other,
      color: undefined as MapMarkerShopColor | undefined,
    },
    point: undefined as GisPoint | undefined,
  };
  record = {
    picture: {
      src: '',
      polygon: [] as HowellPoint[][],
      page: {
        data: Page.create(1),
        change: (page: Page) => {
          this.record.picture.page.data = page;
          if (
            this.data &&
            this.data.Resources &&
            this.data.Resources.length >= page.PageIndex
          ) {
            let index = page.PageIndex - 1;
            let resource = this.data.Resources[index];
            this.record.picture.src = resource.ImageUrl ?? '';
            if (resource.Objects) {
              this.record.picture.polygon = resource.Objects.map(
                (x) => x.Polygon ?? []
              );
            }
          }
        },
      },
    },
  };
}
