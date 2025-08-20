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
import { PaginatorComponent } from '../../../../../../../common/components/paginator/paginator.component';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../../../common/data-core/models/page-list.model';
import { SystemMainPanelShopRegistrationTableBusiness } from './system-main-panel-shop-registration-table.business';

@Component({
  selector: 'ias-system-main-panel-shop-registration-table',
  imports: [CommonModule, FormsModule, PaginatorComponent],
  templateUrl: './system-main-panel-shop-registration-table.component.html',
  styleUrl: './system-main-panel-shop-registration-table.component.less',
  providers: [SystemMainPanelShopRegistrationTableBusiness],
})
export class SystemMainPanelShopRegistrationTableComponent
  implements OnChanges
{
  @Input('datas') shops: ShopRegistration[] = [];
  @Output() details = new EventEmitter<ShopRegistration>();
  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();
  @Output() itemhover = new EventEmitter<ShopRegistration>();
  @Output() itemblur = new EventEmitter<ShopRegistration>();
  @Output() position = new EventEmitter<ShopRegistration>();
  @Output() edit = new EventEmitter<ShopRegistration>();

  constructor(private business: SystemMainPanelShopRegistrationTableBusiness) {}

  widths = ['auto', '80px'];
  datas: Array<ShopRegistration | undefined> = [];
  page = new Page();
  text = {
    prev: `<i class="mdi mdi-chevron-left"></i>`,
    next: `<i class="mdi mdi-chevron-right"></i>`,
    first: `<i class="mdi mdi-page-first"></i>`,
    last: `<i class="mdi mdi-page-last"></i>`,
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['shops']);
    this.change.selected(changes['selected']);
  }

  change = {
    datas: (change: SimpleChange) => {
      if (change) {
        if (this.shops) {
          this.load(1, 10, this.shops);
        }
      }
    },
    selected: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.selected) {
          let index = this.shops.findIndex((x) => x.Id === this.selected?.Id);
          if (index >= 0) {
            let pageindex = Math.floor(index / this.page.PageSize) + 1;
            if (pageindex != this.page.PageIndex) {
              this.load(pageindex, this.page.PageSize, this.shops);
            }
            this.selected = this.shops[index];
            this.selectedChange.emit(this.selected);
          }
        }
      }
    },
  };

  private async load(index: number, size: number, shops: ShopRegistration[]) {
    return this.business.load(index, size, [...shops]).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
      return this.datas;
    });
  }

  on = {
    select: (item?: ShopRegistration) => {
      this.selected = item;
      this.selectedChange.emit(item);
    },
    position: (e: Event, item?: ShopRegistration) => {
      this.position.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    details: (e: Event, item?: ShopRegistration) => {
      this.details.emit(item);
      if (this.selected == item) {
        e.stopImmediatePropagation();
      }
    },
    page: (index: number) => {
      this.load(index, this.page.PageSize, this.shops);
    },
    mouse: {
      over: (item?: ShopRegistration) => {
        this.itemhover.emit(item);
      },
      out: (item?: ShopRegistration) => {
        this.itemblur.emit(item);
      },
    },
  };
}
