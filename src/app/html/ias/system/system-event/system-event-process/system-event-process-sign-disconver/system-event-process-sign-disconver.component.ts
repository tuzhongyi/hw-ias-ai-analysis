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
import { SystemEventProcessShopComponent } from '../system-event-process-shop/component/system-event-process-shop.component';
import { SystemEventProcessShopFilterComponent } from '../system-event-process-shop/system-event-process-shop-filter/system-event-process-shop-filter.component';
import { SystemEventProcessShopTableArgs } from '../system-event-process-shop/system-event-process-shop-table/system-event-process-shop-table.model';

@Component({
  selector: 'ias-system-event-process-sign-disconver',
  imports: [
    CommonModule,
    FormsModule,
    PicturePolygonMultipleComponent,
    SystemEventRecordDetailsComponent,
    SystemEventMapComponent,
    SystemEventProcessShopComponent,
    SystemEventProcessShopFilterComponent,
  ],
  templateUrl: './system-event-process-sign-disconver.component.html',
  styleUrl: './system-event-process-sign-disconver.component.less',
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

  constructor() {}

  subname = false;

  ngOnInit(): void {
    if (this.data) {
      this.load.picture(this.data);
      this.load.map(this.data);
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
      polygon: [] as HowellPoint[][],
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
