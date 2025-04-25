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
import { PaginatorComponent } from '../../../../../../../common/components/paginator/paginator.component';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Page } from '../../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../../common/tools/language';
import { ShopConverter } from '../../../../../../../common/view-models/shop/shop.converter';
import { ShopViewModel } from '../../../../../../../common/view-models/shop/shop.view-model';
import { SystemModuleShopCompareTablePagedBusiness } from '../business/system-module-shop-compare-table-paged.business';

@Component({
  selector: 'ias-system-module-shop-compare-table-created',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-module-shop-compare-table-created.component.html',
  styleUrl: './system-module-shop-compare-table-created.component.less',
  providers: [SystemModuleShopCompareTablePagedBusiness],
})
export class SystemModuleShopCompareTableCreatedComponent implements OnChanges {
  @Input('datas') shops: Array<IShop> = [];
  @Input() selecteds: IShop[] = [];
  @Output() selectedsChange = new EventEmitter<IShop[]>();
  @Output() info = new EventEmitter<IShop>();

  constructor(
    private business: SystemModuleShopCompareTablePagedBusiness,
    private converter: ShopConverter
  ) {}

  widths = ['7%', '8%', '15%', '15%', '10%', '10%', '10%', '10%', '10%', '5%'];
  page: Page = Page.create(1, 10);
  datas: (ShopViewModel | undefined)[] = [];
  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['shops']);
  }

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.load(1, this.page.PageSize, this.shops);
      }
    },
  };
  private load(index: number, size: number, datas: IShop[]) {
    this.business.load(index, size, [...datas]).then((paged) => {
      this.page = paged.Page;
      this.datas = paged.Data.map(
        (x) => this.converter.convert(x) as ShopViewModel
      );

      if (this.datas.length > 0) {
        while (this.datas.length < this.page.PageSize) {
          this.datas.push(undefined);
        }
      }
    });
  }

  onpage(index: number) {
    this.selecteds = [];
    this.selectedsChange.emit(this.selecteds);
    this.load(index, this.page.PageSize, this.shops);
  }

  onselect(item?: IShop) {
    if (item) {
      if (this.selecteds.includes(item)) {
        this.selecteds = this.selecteds.filter((x) => x !== item);
      } else {
        this.selecteds.push(item);
      }
      this.selectedsChange.emit(this.selecteds);
    }
  }
  onall() {
    if (this.selecteds.length === this.page.RecordCount) {
      this.selecteds = [];
    } else {
      this.selecteds = [];
      for (let i = 0; i < this.datas.length; i++) {
        let item = this.datas[i];
        if (item) {
          this.selecteds.push(item);
        }
      }
    }
  }
  onstop(e: Event) {
    e.stopImmediatePropagation();
  }

  oninfo(item: IShop, e: Event) {
    this.info.emit(item);

    e.stopPropagation();
  }
}
