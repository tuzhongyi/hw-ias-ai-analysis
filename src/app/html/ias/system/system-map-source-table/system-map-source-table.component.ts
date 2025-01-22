import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';
import { SystemMapSourceTableBusiness } from './system-map-source-table.business';

@Component({
  selector: 'ias-system-map-source-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-map-source-table.component.html',
  styleUrl: './system-map-source-table.component.less',
  providers: [SystemMapSourceTableBusiness],
})
export class SystemMapSourceTableComponent implements OnInit {
  @Input('datas') shops: Shop[] = [];
  @Output() details = new EventEmitter<Shop>();
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();
  @Output() itemhover = new EventEmitter<Shop>();
  @Output() itemblur = new EventEmitter<Shop>();
  @Output() position = new EventEmitter<Shop>();

  constructor(private business: SystemMapSourceTableBusiness) {}

  widths = ['70px', 'auto', '100px', '70px'];
  datas: ShopViewModel[] = [];

  Color = ColorTool;

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load(this.shops).then((x) => {
      this.datas = x;
    });
  }

  onselect(item: Shop) {
    this.selected = item;
    this.selectedChange.emit(item);
  }

  ondetails(data: Shop, e: Event) {
    this.details.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }
  onmouseover(data: Shop) {
    this.itemhover.emit(data);
  }
  onmouseout(data: Shop) {
    this.itemblur.emit(data);
  }
  onposition(data: Shop, e: Event) {
    this.position.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }

  onsort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      return LocaleCompare.compare(
        a[sort.active],
        b[sort.active],
        sort.direction === 'asc'
      );
    });
  }
}
