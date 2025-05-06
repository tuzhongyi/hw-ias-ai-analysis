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
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { ShopConverter } from '../../../../../../../common/view-models/shop/shop.converter';
import { IShopViewModel } from '../../../../../../../common/view-models/shop/shop.view-model';
import { SystemModuleShopCompareTablePagedBusiness } from '../business/system-module-shop-compare-table-paged.business';

@Component({
  selector: 'ias-system-module-shop-compare-table-disappeared',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-module-shop-compare-table-disappeared.component.html',
  styleUrl: './system-module-shop-compare-table-disappeared.component.less',
  providers: [SystemModuleShopCompareTablePagedBusiness],
})
export class SystemModuleShopCompareTableDisappearedComponent
  implements OnChanges
{
  @Input('datas') shops: Array<IShop> = [];
  @Output() info = new EventEmitter<IShop>();

  constructor(
    private business: SystemModuleShopCompareTablePagedBusiness,
    private converter: ShopConverter
  ) {}

  widths = ['10%', '20%', '20%', '15%', '10%', '15%', '10%'];
  page: Page = Page.create(1, 10);
  datas: (IShopViewModel | undefined)[] = [];
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
      this.datas = paged.Data.map((x) => this.converter.convert(x));
      if (this.datas.length > 0) {
        while (this.datas.length < this.page.PageSize) {
          this.datas.push(undefined);
        }
      }
    });
  }

  onpage(index: number) {
    this.load(index, this.page.PageSize, this.shops);
  }
  oninfo(item: IShop, e: Event) {
    this.info.emit(item);
    e.stopPropagation();
  }
}
