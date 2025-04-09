import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import {
  Page,
  Paged,
  PagedList,
} from '../../../../common/data-core/models/page-list.model';
import { PictureComponent } from '../../share/picture/picture.component';
import { SystemMapPanelDetailsShopSignTableComponent } from '../system-map-panel-details-shop-sign-table/system-map-panel-details-shop-sign-table.component';

@Component({
  selector: 'ias-system-map-panel-details-shop-sign',
  imports: [
    CommonModule,
    PictureComponent,
    SystemMapPanelDetailsShopSignTableComponent,
  ],
  templateUrl: './system-map-panel-details-shop-sign.component.html',
  styleUrl: './system-map-panel-details-shop-sign.component.less',
})
export class SystemMapPanelDetailsShopSignComponent
  implements OnInit, OnDestroy
{
  @Input() shop?: Shop;
  @Output() close = new EventEmitter<void>();
  @Input() sign?: ShopSign;
  @Output() signChange = new EventEmitter<ShopSign>();
  @Output() picture = new EventEmitter<Paged<ShopSign>>();
  @Input() page?: EventEmitter<Page>;

  constructor() {}

  paged = new PagedList<ShopSign>();
  subscription = new Subscription();

  ngOnInit(): void {
    if (this.page) {
      let sub = this.page.subscribe((x) => {
        this.paged.Page.PageIndex = x.PageIndex;
        this.sign = this.paged.Data[x.PageIndex - 1];
      });
      this.subscription.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onerror(e: Error) {}

  onclose() {
    this.close.emit();
  }

  onloaded(datas: ShopSign[]) {
    this.paged.Data = datas;
    this.paged.Page = new Page();
    this.paged.Page.PageCount = datas.length;
    this.paged.Page.PageIndex = 1;
    this.paged.Page.PageSize = 1;
    this.paged.Page.RecordCount = 1;
    this.paged.Page.TotalRecordCount = datas.length;
  }

  onsign(sign: ShopSign) {
    this.sign = sign;
    this.signChange.emit(this.sign);
    let index = this.paged.Data.findIndex((x) => x.Id === sign.Id);
    if (index >= 0) {
      this.paged.Page.PageIndex = index + 1;
    }
  }

  onpicture() {
    if (this.sign) {
      let paged = new Paged<ShopSign>();
      paged.Data = this.sign;
      paged.Page = this.paged.Page;
      this.picture.emit(paged);
    }
  }
}
