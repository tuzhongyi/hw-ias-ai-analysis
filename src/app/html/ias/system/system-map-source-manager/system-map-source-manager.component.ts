import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputIconComponent } from '../../../../common/components/input-icon/input-icon.component';
import { ShopObjectState } from '../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { EnumNameValue } from '../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SourceManager } from '../../../../common/data-core/requests/managers/source.manager';
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
export class SystemMapSourceManagerComponent implements OnInit, OnDestroy {
  @Input('datas') shops: Shop[] = [];
  @Input() args = new SystemMapShopFilterArgs();
  @Output() argsChange = new EventEmitter<SystemMapShopFilterArgs>();

  @Output() details = new EventEmitter<Shop>();
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();

  @Output() itemhover = new EventEmitter<Shop>();
  @Output() itemblur = new EventEmitter<Shop>();

  constructor(source: SourceManager) {
    this.states = source.shop.ShopObjectStates;
  }

  filter = new SystemMapShopFilterArgs();
  states: Promise<EnumNameValue<ShopObjectState>[]>;
  handle: any;

  ngOnInit(): void {
    this.filter = Object.assign(this.filter, this.args);
    this.handle = this.onenter.bind(this);
    window.addEventListener('keypress', this.handle);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      window.removeEventListener('keypress', this.handle);
    }
  }

  onenter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.onsearch();
    }
  }

  onsearch() {
    this.argsChange.emit(this.filter);
  }
  ondetails(data: Shop) {
    this.details.emit(data);
  }
  onposition(data: Shop) {
    this.selected = data;
    this.selectedChange.emit(data);
  }
  onmouseover(data: Shop) {
    this.itemhover.emit(data);
  }
  onmouseout(data: Shop) {
    this.itemblur.emit(data);
  }
}
