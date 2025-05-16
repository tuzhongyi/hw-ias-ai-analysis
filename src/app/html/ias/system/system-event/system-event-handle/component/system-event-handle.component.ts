import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArmEventType } from '../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { ListPageComponent } from '../../../../share/list-page/list-page.component';
import { PicturePolygonMultipleComponent } from '../../../../share/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { PicturePolygonZoomComponent } from '../../../../share/picture/picture-polygon-zoom/picture-polygon-zoom.component';
import { SystemMapPanelDetailsShopSignTableComponent } from '../../../system-map/system-map-panel-details-shop-sign-table/system-map-panel-details-shop-sign-table.component';
import { SystemEventRecordDetailsComponent } from '../../system-event-record/system-event-record-details/system-event-record-details.component';
import { SystemEventHandleBusiness } from './system-event-handle.business';
import {
  ISystemEventHandleResult,
  SystemEventHandleModel,
} from './system-event-handle.model';

@Component({
  selector: 'ias-system-event-handle',
  imports: [
    CommonModule,
    FormsModule,
    ListPageComponent,
    PicturePolygonMultipleComponent,
    PicturePolygonZoomComponent,
    SystemEventRecordDetailsComponent,
    SystemMapPanelDetailsShopSignTableComponent,
  ],
  templateUrl: './system-event-handle.component.html',
  styleUrl: './system-event-handle.component.less',
  providers: [SystemEventHandleBusiness],
})
export class SystemEventHandleComponent implements OnChanges {
  @Input() data?: MobileEventRecord;
  @Input() page?: Page;
  @Output() get = new EventEmitter<number>();

  @Output() misinform = new EventEmitter<ISystemEventHandleResult>();
  @Output() registrationdelete = new EventEmitter<ISystemEventHandleResult>();
  @Output() registrationmerge = new EventEmitter<ISystemEventHandleResult>();
  @Output() registrationcreate = new EventEmitter<ISystemEventHandleResult>();
  @Output() shopsuspension = new EventEmitter<ISystemEventHandleResult>();
  @Output() shopoperation = new EventEmitter<ISystemEventHandleResult>();
  @Output() shopdecoration = new EventEmitter<ISystemEventHandleResult>();
  @Output() shopmarking = new EventEmitter<ISystemEventHandleResult>();

  @Output() close = new EventEmitter<void>();

  constructor(private business: SystemEventHandleBusiness) {}

  Type = ArmEventType;
  shop?: Shop;
  sign?: ShopSign;
  picture = {
    id: '',
    polygon: [] as HowellPoint[][],
  };
  model = new SystemEventHandleModel();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        this.operation.clear();
        if (this.data) {
          console.log(this.data);
          this.load.picture(this.data);
          this.load.shop(this.data);
          this.load.operation(this.data);
        }
      }
    },
  };

  private load = {
    picture: (data: MobileEventRecord) => {
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.picture.id = resource.ImageUrl ?? '';
        this.picture.polygon = resource.Objects?.map((x) => x.Polygon) ?? [];
      }
    },
    shop: (data: MobileEventRecord) => {
      switch (data.EventType) {
        case ArmEventType.ShopSignCreated:
        case ArmEventType.ShopSignDisappeared:
          if (data.Resources && data.Resources.length > 0) {
            let resource = data.Resources[0];
            this.business.shop.get(resource.ResourceId).then((x) => {
              this.shop = x;
            });
          }

          break;

        default:
          break;
      }
    },
    operation: (data: MobileEventRecord) => {
      if (data.Assignment) {
        if (data.Assignment.IsMisInfo) {
          this.model.misinform = true;
        } else {
          switch (data.Assignment.AssociationType) {
            case 1:
              this.model.misinform = true;
              break;
            case 2:
              this.model.registrationdelete = true;
              break;
            case 3:
              this.model.shopsuspension = true;
              break;
            case 4:
              this.model.shopoperation = true;
              break;
            case 5:
              this.model.shopmarking = true;
              break;
            case 6:
              this.model.registrationmerge = true;
              break;
            default:
              break;
          }
        }
      }
    },
  };

  onpage(index: number) {
    this.get.emit(index);
  }

  operation = {
    change: (_key: string) => {
      this.operation.clear();
      this.model[_key] = true;
    },
    clear: () => {
      for (const key in this.model) {
        this.model[key] = false;
      }
    },
  };

  value = {
    misinform: false,
  };

  onok() {
    let key = '';
    for (const _key in this.model) {
      if (this.model[_key]) {
        key = _key;
      }
    }
    if (!key) return;
    if (!this.data) return;
    let result: ISystemEventHandleResult = {
      model: key,
      data: this.data,
    };
    if (this.model.misinform) {
      this.misinform.emit(result);
    } else if (this.model.registrationdelete) {
      this.registrationdelete.emit(result);
    } else if (this.model.registrationcreate) {
      this.registrationcreate.emit(result);
    } else if (this.model.registrationmerge) {
      this.registrationmerge.emit(result);
    } else if (this.model.shopsuspension) {
      this.shopsuspension.emit(result);
    } else if (this.model.shopoperation) {
      this.shopoperation.emit(result);
    } else if (this.model.shopdecoration) {
      this.shopdecoration.emit(result);
    } else if (this.model.shopmarking) {
      this.shopmarking.emit(result);
    }
  }
  oncancel() {
    this.close.emit();
  }
}
