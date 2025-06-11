import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerPageComponent } from '../../../../../../common/components/container-page/container-page.component';
import { ContainerZoomComponent } from '../../../../../../common/components/container-zoom/container-zoom.component';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import {
  Page,
  PagedList,
} from '../../../../../../common/data-core/models/page-list.model';
import { PicturePolygonComponent } from '../../../../share/picture/picture-polygon/picture-polygon.component';
import { SystemEventMapComponent } from '../../system-event-map/system-event-map.component';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../system-event-map/system-event-map.model';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';
import { SystemEventProcessShopComponent } from '../system-event-process-shop/component/system-event-process-shop.component';
import { SystemEventProcessShopFilterComponent } from '../system-event-process-shop/system-event-process-shop-filter/system-event-process-shop-filter.component';
import { SystemEventProcessShopTableArgs } from '../system-event-process-shop/system-event-process-shop-table/system-event-process-shop-table.model';
import { SystemEventProcessSignDisconverShopSignBusiness } from './business/system-event-process-sign-disconver-shop-sign.business';
import { SystemEventProcessSignDisconverShopBusiness } from './business/system-event-process-sign-disconver-shop.business';
import { SystemEventProcessSignDisconverBusiness } from './business/system-event-process-sign-disconver.business';

@Component({
  selector: 'ias-system-event-process-sign-disconver',
  imports: [
    CommonModule,
    FormsModule,
    ContainerPageComponent,
    ContainerZoomComponent,
    PicturePolygonComponent,
    SystemEventRecordDetailsComponent,
    SystemEventMapComponent,
    SystemEventProcessShopComponent,
    SystemEventProcessShopFilterComponent,
  ],
  templateUrl: './system-event-process-sign-disconver.component.html',
  styleUrl: './system-event-process-sign-disconver.component.less',
  providers: [
    SystemEventProcessSignDisconverBusiness,
    SystemEventProcessSignDisconverShopBusiness,
    SystemEventProcessSignDisconverShopSignBusiness,
  ],
})
export class SystemEventProcessSignDisconverComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Input('load') _load?: EventEmitter<void>;
  @Output() merge = new EventEmitter<{
    name?: string;
    subname: boolean;
    associated: ShopRegistration;
    data: MobileEventRecord;
  }>();
  @Output() marking = new EventEmitter<MobileEventRecord>();

  @Output() create = new EventEmitter<MobileEventRecord>();
  @Output() picture = new EventEmitter<
    PagedList<MobileEventRecord | ShopRegistration | undefined>
  >();
  @Output() cancel = new EventEmitter<void>();
  @Output() shopedit = new EventEmitter<ShopRegistration>();

  constructor(private business: SystemEventProcessSignDisconverBusiness) {}

  subname = false;

  ngOnInit(): void {
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
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
      this.map.location = data.Location;
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
  };

  map = {
    location: undefined as GisPoint | undefined,
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerShopColor.orange,
    },
    point: undefined as GisPoint | undefined,
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
          this.map.location = this.record.sign.selected.Location;
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
      click: () => {
        if (this.data) {
          let datas = new Array<
            MobileEventRecord | ShopRegistration | undefined
          >();
          datas.push(this.data);
          if (this.shop.selected) {
            datas.push(this.shop.selected);
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
      polygon: [] as HowellPoint[],

      zoom: {
        reset: {
          value: false,
          set: () => {
            this.shop.picture.zoom.reset.value = true;
          },
        },
      },
      click: () => {
        if (this.data) {
          let datas = new Array<
            MobileEventRecord | ShopRegistration | undefined
          >();
          datas.push(this.data);
          if (this.shop.selected) {
            datas.push(this.shop.selected);
          }
          let paged = PagedList.create(datas, datas.length, datas.length);
          paged.Page.PageIndex = 2;
          this.picture.emit(paged);
        }
      },
    },
    selected: undefined as ShopRegistration | undefined,
    args: new SystemEventProcessShopTableArgs(),
    on: {
      select: (item?: ShopRegistration) => {
        this.shop.selected = item;
        if (item) {
          this.shop.picture.src = item.ImageUrl ?? '';
          this.map.point = item.Location;
        } else {
          this.shop.picture.src = '';
          this.map.point = undefined;
        }
      },
      create: () => {
        this.create.emit(this.data);
      },
      filter: () => {
        this.shop.filter.show = !this.shop.filter.show;
      },
      edit: (shop: ShopRegistration) => {
        this.shopedit.emit(shop);
      },
    },
    filter: {
      show: false,
      ok: (args: SystemEventProcessShopTableArgs) => {
        this.shop.args = args;
        this.shop.filter.close();
      },
      close: () => {
        this.shop.filter.show = false;
      },
    },
  };

  on = {
    cancel: () => {
      this.cancel.emit();
    },
    marking: () => {
      this.marking.emit(this.data);
    },
    merge: () => {
      if (
        this.data &&
        this.data.Resources &&
        this.data.Resources.length > 0 &&
        this.shop.selected
      ) {
        let resource = this.data.Resources[0];
        let name = this.subname
          ? resource.ResourceName
          : this.shop.selected.Name;
        this.merge.emit({
          name: name,
          subname: this.subname,
          associated: this.shop.selected,
          data: this.data,
        });
      }
    },
  };
}
