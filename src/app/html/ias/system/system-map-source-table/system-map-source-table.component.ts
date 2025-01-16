import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { Language } from '../../../../common/tools/language';
import { SystemMapSourceTableBusiness } from './system-map-source-table.business';
import { SystemMapSourceTableConverter } from './system-map-source-table.converter';

@Component({
  selector: 'ias-system-map-source-table',
  imports: [CommonModule],
  templateUrl: './system-map-source-table.component.html',
  styleUrl: './system-map-source-table.component.less',
  providers: [SystemMapSourceTableBusiness, SystemMapSourceTableConverter],
})
export class SystemMapSourceTableComponent {
  @Input('datas') datas: Shop[] = [];
  @Output() details = new EventEmitter<Shop>();
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();

  constructor(private business: SystemMapSourceTableBusiness) {}

  widths = ['70px', 'auto', '120px', '80px'];

  Color = ColorTool;
  Language = Language;

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
}
