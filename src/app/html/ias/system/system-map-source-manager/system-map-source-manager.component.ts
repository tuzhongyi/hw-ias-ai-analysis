import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputIconComponent } from '../../../../common/components/input-icon/input-icon.component';
import { ShopObjectState } from '../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../common/tools/language';
import { SystemMapPanelHeadComponent } from '../system-map-panel-head/system-map-panel-head.component';
import { SystemMapSourceTableComponent } from '../system-map-source-table/system-map-source-table.component';
import { SystemMapShopFilterArgs } from '../system-map/system-map.model';

@Component({
  selector: 'ias-system-map-source-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemMapPanelHeadComponent,
    InputIconComponent,
    SystemMapSourceTableComponent,
  ],
  templateUrl: './system-map-source-manager.component.html',
  styleUrl: './system-map-source-manager.component.less',
})
export class SystemMapSourceManagerComponent implements OnInit {
  @Input('datas') shops: Shop[] = [];
  @Input() args = new SystemMapShopFilterArgs();
  @Output() argsChange = new EventEmitter<SystemMapShopFilterArgs>();

  @Output() details = new EventEmitter<Shop>();
  @Output() position = new EventEmitter<Shop>();

  constructor() {}

  filter = new SystemMapShopFilterArgs();
  states: ShopObjectState[] = EnumTool.values(ShopObjectState);
  Language = Language;

  ngOnInit(): void {
    this.filter = Object.assign(this.filter, this.args);
  }

  onsearch() {
    this.argsChange.emit(this.filter);
  }
  ondetails(data: Shop) {
    this.details.emit(data);
  }
  onposition(data: Shop) {
    this.position.emit(data);
  }
}
