import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventMapComponent } from '../../system-event-map/system-event-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../system-event-map/system-event-map.model';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';
import { SystemEventProcessShopInfoComponent } from '../system-event-process-shop/system-event-process-shop-info/system-event-process-shop-info.component';
import { SystemEventProcessSignDisappearBusiness } from './system-event-process-sign-disappear.business';

@Component({
  selector: 'ias-system-event-process-sign-disappear',
  imports: [
    CommonModule,
    FormsModule,
    PicturePolygonMultipleComponent,
    SystemEventRecordDetailsComponent,
    SystemEventMapComponent,
    SystemEventProcessShopInfoComponent,
  ],
  templateUrl: './system-event-process-sign-disappear.component.html',
  styleUrl: './system-event-process-sign-disappear.component.less',
  providers: [SystemEventProcessSignDisappearBusiness],
})
export class SystemEventProcessSignDisappearComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Output() misinfo = new EventEmitter<MobileEventRecord>();
  @Output() delete = new EventEmitter<MobileEventRecord>();
  @Output() cancel = new EventEmitter<void>();
  @Output() picture = new EventEmitter<
    PagedList<MobileEventRecord | ShopRegistration | undefined>
  >();

  constructor(private business: SystemEventProcessSignDisappearBusiness) {}

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
          let datas = new Array<
            MobileEventRecord | ShopRegistration | undefined
          >();
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
        if (this.data) {
          let datas = new Array<
            MobileEventRecord | ShopRegistration | undefined
          >();
          datas.push(this.data);
          if (this.shop.data) {
            datas.push(this.shop.data);
          }
          let paged = PagedList.create(datas, datas.length, datas.length);
          paged.Page.PageIndex = 2;
          this.picture.emit(paged);
        }
      },
    },
    data: undefined as ShopRegistration | undefined,
  };

  on = {
    cancel: () => {
      this.cancel.emit();
    },
    misinfo: () => {
      this.misinfo.emit(this.data);
    },
    delete: () => {
      this.delete.emit(this.data);
    },
  };
}
