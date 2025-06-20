import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { IASMapComponent } from '../../../../share/map/ias-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../../share/map/ias-map.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';
import { SystemEventProcessInfoHandledComponent } from '../system-event-process-info-handled/system-event-process-info-handled.component';
import { SystemEventProcessInfoBusiness } from './system-event-process-info.business';

@Component({
  selector: 'ias-system-event-process-info',
  imports: [
    CommonModule,
    FormsModule,
    PicturePolygonMultipleComponent,
    SystemEventRecordDetailsComponent,
    IASMapComponent,
    SystemEventProcessInfoHandledComponent,
  ],
  templateUrl: './system-event-process-info.component.html',
  styleUrl: './system-event-process-info.component.less',
  providers: [SystemEventProcessInfoBusiness],
})
export class SystemEventProcessInfoComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Output() picture = new EventEmitter<
    PagedList<MobileEventRecord | ShopRegistration>
  >();

  constructor(private business: SystemEventProcessInfoBusiness) {}

  ngOnInit(): void {
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
      this.load.shop(this.data);
    }
  }
  load = {
    picture: (data: MobileEventRecord) => {
      if (data && data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.record.picture.src = resource.ImageUrl ?? '';
        if (resource.Objects) {
          this.record.picture.polygon = resource.Objects.map(
            (x) => x.Polygon ?? []
          );
        }
      }
    },
    map: (data: MobileEventRecord) => {
      switch (data.EventType) {
        case 8:
          this.map.marker.color = MapMarkerShopColor.orange;
          break;
        case 9:
          this.map.marker.color = MapMarkerShopColor.green;
          break;

        default:
          break;
      }
    },
    shop: async (data: MobileEventRecord) => {
      if (data && data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        if (resource.RelationId) {
          this.shop.data = await this.business.get(resource.RelationId);
        } else {
          this.shop.data = await this.business.from.shop(resource.ResourceId);
        }
        this.shop.picture.src = this.shop.data?.ImageUrl ?? '';
        this.map.point = this.shop.data?.Location;
      }
      if (data.Assignment?.IsMisInfo) {
        this.shop.picture.src = '';
      }
    },
  };

  map = {
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerShopColor.orange,
    },
    point: undefined as GisPoint | undefined,
  };
  record = {
    picture: {
      src: '',
      polygon: [] as HowellPoint[][],
      click: () => {
        if (this.data) {
          let datas = new Array<MobileEventRecord | ShopRegistration>();
          datas.push(this.data);
          if (this.shop.data) {
            datas.push(this.shop.data);
          }
          let paged = PagedList.create(datas, 1, datas.length);
          this.picture.emit(paged);
        }
      },
    },
  };

  shop = {
    picture: {
      src: '',
      polygon: [] as HowellPoint[][],
      click: () => {
        if (this.data && this.shop.data) {
          let datas = new Array<MobileEventRecord | ShopRegistration>();
          datas.push(this.data);
          datas.push(this.shop.data);
          let paged = PagedList.create(datas, datas.length, datas.length);
          paged.Page.PageIndex = 2;
          this.picture.emit(paged);
        }
      },
    },
    data: undefined as ShopRegistration | undefined,
  };
}
