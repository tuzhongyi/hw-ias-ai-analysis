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
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { SystemModuleShopRegistrationMapPanelShopTableBusiness } from './system-module-shop-registration-map-panel-shop-table.business';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-shop-table',
  imports: [CommonModule, FormsModule, PaginatorComponent],
  templateUrl:
    './system-module-shop-registration-map-panel-shop-table.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-shop-table.component.less',
  providers: [SystemModuleShopRegistrationMapPanelShopTableBusiness],
})
export class SystemModuleShopRegistrationMapPanelShopTableComponent
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

  constructor(
    private business: SystemModuleShopRegistrationMapPanelShopTableBusiness
  ) {}

  widths = ['60px', 'auto', '100px', '80px'];
  datas: Array<ShopRegistration | undefined> = [];
  page = new Page();
  Color = ColorTool;
  road = 'on';

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['shops']);
  }

  change = {
    datas: (change: SimpleChange) => {
      if (change) {
        if (this.shops) {
          this.load(1, 10, this.shops);
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
    edit: (e: Event, item: ShopRegistration) => {
      this.edit.emit(item);
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
