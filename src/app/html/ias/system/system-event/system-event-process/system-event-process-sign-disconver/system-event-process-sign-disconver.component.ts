import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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

import { WheelHorizontalScrollDirective } from '../../../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import {
  MapMarkerColor,
  MapMarkerType,
} from '../../../../share/map/ias-map.model';
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
    IASMapComponent,
    SystemEventProcessShopComponent,
    SystemEventProcessShopFilterComponent,
    WheelHorizontalScrollDirective,
  ],
  templateUrl: './system-event-process-sign-disconver.component.html',
  styleUrl: './system-event-process-sign-disconver.component.less',
  providers: [
    SystemEventProcessSignDisconverBusiness,
    SystemEventProcessSignDisconverShopBusiness,
    SystemEventProcessSignDisconverShopSignBusiness,
  ],
})
export class SystemEventProcessSignDisconverComponent
  implements OnInit, OnChanges
{
  @Input() data?: MobileEventRecord;
  @Input('load') _load?: EventEmitter<void>;
  @Output() merge = new EventEmitter<{
    name?: string;
    subname: boolean;
    detected: ShopRegistration;
    data: MobileEventRecord;
  }>();
  @Output() marking = new EventEmitter<MobileEventRecord>();

  @Output() create = new EventEmitter<MobileEventRecord>();
  @Output() picture = new EventEmitter<
    PagedList<ShopSign | ShopRegistration>
  >();
  @Output() cancel = new EventEmitter<void>();
  @Output() shopedit = new EventEmitter<ShopRegistration>();
  @Output() loaded = new EventEmitter<ShopRegistration[]>();

  constructor(private business: SystemEventProcessSignDisconverBusiness) {}

  subname = false;

  ngOnInit(): void {
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }
  private change = {
    data: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.data) {
          this.shop.reset();
          this.load.picture(this.data);
          this.load.map(this.data);
        }
      }
    },
  };

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
      } else {
      }
    },
    map: (data: MobileEventRecord) => {
      this.map.location = data.Location?.GCJ02;
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
  };

  map = {
    location: undefined as GisPoint | undefined,
    marker: {
      type: MapMarkerType.shop,
      color: MapMarkerColor.orange,
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
      full: () => {
        let paged = new PagedList<ShopSign>();
        paged.Data = [...this.record.sign.datas];
        paged.Page = this.record.picture.page.value;
        this.picture.emit(paged);
      },
    },
  };
  shop = {
    reset: () => {
      this.shop.picture.src = '';
      this.shop.picture.polygon = [];
      this.shop.selected = undefined;
      this.shop.args = new SystemEventProcessShopTableArgs();
    },
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
      full: () => {
        if (this.shop.selected) {
          let paged = PagedList.create([this.shop.selected], 1, 1);
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
          this.map.point = item.Location?.GCJ02;
        } else {
          this.shop.picture.src = '';
          this.map.point = undefined;
        }
        this.shop.picture.zoom.reset.set();
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
      loaded: (datas: ShopRegistration[]) => {
        this.loaded.emit(datas);
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
          detected: this.shop.selected,
          data: this.data,
        });
      }
    },
  };
}
