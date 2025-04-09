import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextSpaceBetweenDirective } from '../../../../common/directives/text-space-between/text-space-between.directive';
import { SystemMapShopArgs } from '../system-map/business/shop/system-map-shop.model';
import { SystemMapDistanceArgs } from '../system-map/system-map.model';
import { SystemMapFilterSourceController } from './controller/system-map-filter-source.controller';

@Component({
  selector: 'ias-system-map-filter',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-map-filter.component.html',
  styleUrl: './system-map-filter.component.less',
  providers: [SystemMapFilterSourceController],
})
export class SystemMapFilterComponent {
  @Input() filter = new SystemMapShopArgs();
  @Output() filterChange = new EventEmitter<SystemMapShopArgs>();

  @Input() distance = new SystemMapDistanceArgs();
  @Output() distanceChange = new EventEmitter<SystemMapDistanceArgs>();

  @Output() close = new EventEmitter<void>();

  @Output() search = new EventEmitter<SystemMapShopArgs>();

  @Output() mapdistance = new EventEmitter<void>();

  constructor(public source: SystemMapFilterSourceController) {}

  onsearch() {
    this.search.emit(this.filter);
  }
  onclose() {
    this.close.emit();
  }

  onmapmapdistance() {
    this.mapdistance.emit();
  }
  onreset() {
    this.filter.clear();
    this.distance.enabled = false;
  }
}
