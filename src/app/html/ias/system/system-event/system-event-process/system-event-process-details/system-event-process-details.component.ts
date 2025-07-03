import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { SystemEventProcessHandledComponent } from '../system-event-process-handled/system-event-process-handled.component';
import { SystemEventProcessInfoComponent } from '../system-event-process-info/system-event-process-info.component';
import { SystemEventProcessDetailsBusiness } from './system-event-process-details.business';

@Component({
  selector: 'ias-system-event-process-details',
  imports: [
    CommonModule,
    PicturePolygonMultipleComponent,
    SystemEventProcessInfoComponent,
    SystemEventProcessHandledComponent,
  ],
  templateUrl: './system-event-process-details.component.html',
  styleUrl: './system-event-process-details.component.less',
  providers: [SystemEventProcessDetailsBusiness],
})
export class SystemEventProcessDetailsComponent {
  @Input() data?: MobileEventRecord;
  @Output() picture = new EventEmitter<
    PagedList<MobileEventRecord | ShopRegistration>
  >();

  constructor(private business: SystemEventProcessDetailsBusiness) {}

  ngOnInit(): void {
    if (this.data) {
      this.load.shop(this.data);
    }
  }
  load = {
    ed: false,
    shop: (data: MobileEventRecord) => {
      this.load.ed = false;
      switch (data.EventType) {
        case 5:
        case 7:
        case 8:
        case 9:
          if (data && data.Resources && data.Resources.length > 0) {
            let resource = data.Resources[0];
            let promise: Promise<ShopRegistration | undefined>;
            if (resource.RelationId) {
              promise = this.business.get(resource.RelationId);
            } else {
              promise = this.business.from.shop(resource.ResourceId);
            }

            promise.then((shop) => {
              this.shop.data = shop;
              this.shop.picture.src = shop?.ImageUrl ?? '';
              this.load.ed = true;
            });
          } else {
            this.load.ed = true;
          }
          if (data.Assignment?.IsMisInfo) {
            this.shop.picture.src = '';
          }

          break;

        default:
          this.load.ed = true;
          break;
      }
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
