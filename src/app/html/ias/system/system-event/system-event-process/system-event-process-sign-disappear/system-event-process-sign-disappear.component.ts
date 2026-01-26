import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { ContainerZoomComponent } from '../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { IASMapComponent } from '../../../../share/map/ias-map.component';
import { PicturePolygonComponent } from '../../../../share/picture/picture-polygon/picture-polygon.component';

import {
  MapMarkerColor,
  MapMarkerType,
} from '../../../../share/map/ias-map.model';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';
import { SystemEventProcessShopInfoComponent } from '../system-event-process-shop/system-event-process-shop-info/system-event-process-shop-info.component';
import { SystemEventProcessSignDisappearShopSignBusiness } from './business/system-event-process-sign-disappear-shop-sign.business';
import { SystemEventProcessSignDisappearShopBusiness } from './business/system-event-process-sign-disappear-shop.business';
import { SystemEventProcessSignDisappearBusiness } from './business/system-event-process-sign-disappear.business';

@Component({
  selector: 'ias-system-event-process-sign-disappear',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    ContainerZoomComponent,
    PicturePolygonComponent,
    SystemEventRecordDetailsComponent,
    IASMapComponent,
    SystemEventProcessShopInfoComponent,
  ],
  templateUrl: './system-event-process-sign-disappear.component.html',
  styleUrl: './system-event-process-sign-disappear.component.less',
  providers: [
    SystemEventProcessSignDisappearBusiness,
    SystemEventProcessSignDisappearShopBusiness,
    SystemEventProcessSignDisappearShopSignBusiness,
  ],
})
export class SystemEventProcessSignDisappearComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Output() misinfo = new EventEmitter<MobileEventRecord>();
  @Output() delete = new EventEmitter<MobileEventRecord>();
  @Output() cancel = new EventEmitter<void>();
  @Output() picture = new EventEmitter<
    PagedList<MobileEventRecord | ShopRegistration>
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
    picture: async (data: MobileEventRecord) => {
      if (data && data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.record.sign.datas = await this.business.shop.sign.load(
          resource.ResourceId,
          data.TaskId
        );
        if (this.record.sign.datas.length > 0) {
          this.record.sign.selected = this.record.sign.datas[0];
          this.record.picture.page.value = Page.create(
            1,
            1,
            this.record.sign.datas.length
          );
          this.record.picture.src = this.record.sign.selected.ImageUrl ?? '';
          this.record.picture.polygon = this.record.sign.selected.Polygon ?? [];
        } else {
          this.record.picture.src = resource.ImageUrl ?? '';
          if (resource.Objects && resource.Objects.length > 0) {
            this.record.picture.polygon = resource.Objects[0].Polygon ?? [];
          }
        }
      }
    },
    map: (data: MobileEventRecord) => {
      switch (data.EventType) {
        case 8:
          this.map.marker.color = MapMarkerColor.orange;
          break;
        case 9:
          this.map.marker.color = MapMarkerColor.green;
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
        this.map.point = this.shop.data?.Location?.GCJ02;
      }
    },
  };

  map = {
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerColor.orange,
    },
    point: undefined as GisPoint | undefined,
    location: undefined as GisPoint | undefined,
  };
  record = {
    sign: {
      datas: [] as ShopSign[],
      selected: undefined as ShopSign | undefined,
    },
    picture: {
      src: '',
      polygon: [] as HowellPoint[],
      page: {
        value: Page.create(1, 1),
        change: (page: Page) => {
          this.record.picture.page.value = page;
          this.record.sign.selected =
            this.record.sign.datas[page.PageIndex - 1];
          this.record.picture.src = this.record.sign.selected.ImageUrl ?? '';
          this.record.picture.polygon = this.record.sign.selected.Polygon ?? [];
          this.record.picture.zoom.reset.set();
          this.map.location = this.record.sign.selected.Location?.GCJ02;
        },
      },
      zoom: {
        reset: {
          value: false,
          set: () => {
            this.record.picture.zoom.reset.value = true;
          },
        },
      },
    },
  };

  shop = {
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
