import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';

import { GeoDirectionSort } from '../../../../common/tools/geo-tool/geo.model';
import { DirectionSortControlComponent } from '../../share/direction-sort-control/direction-sort-control.component';
import { SystemMapSourceTableRoadComponent } from '../system-map-source-table-road/system-map-source-table-road.component';
import { SystemMapSourceTableShopComponent } from '../system-map-source-table-shop/system-map-source-table-shop.component';
import { SystemMapFilterType } from '../system-map/system-map.model';

@Component({
  selector: 'ias-system-map-source-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemMapSourceTableShopComponent,
    SystemMapSourceTableRoadComponent,
    DirectionSortControlComponent,
  ],
  templateUrl: './system-map-source-manager.component.html',
  styleUrl: './system-map-source-manager.component.less',
})
export class SystemMapSourceManagerComponent implements OnInit {
  @Input() shops: Shop[] = [];
  @Input() roads: Road[] = [];

  @Input() type = SystemMapFilterType.shop;
  @Output() typeChange = new EventEmitter<SystemMapFilterType>();

  @Output() details = new EventEmitter<Shop>();
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop | Road>();

  @Output() itemhover = new EventEmitter<Shop>();
  @Output() itemblur = new EventEmitter<Shop>();
  @Output() position = new EventEmitter<Shop | Road>();

  constructor() {}

  Type = SystemMapFilterType;
  sort = new GeoDirectionSort();
  tosort = new EventEmitter<GeoDirectionSort>();

  ngOnInit(): void {}

  ontype(type: SystemMapFilterType) {
    this.type = type;
    this.typeChange.emit(type);
  }

  onselected(data?: Shop | Road) {
    this.selectedChange.emit(data);
  }
  ondetails(data: Shop) {
    this.details.emit(data);
  }
  onposition(data: Shop | Road) {
    this.position.emit(data);
  }
  onmouseover(data: Shop) {
    this.itemhover.emit(data);
  }
  onmouseout(data: Shop) {
    this.itemblur.emit(data);
  }

  onsort(sort: GeoDirectionSort) {
    this.tosort.emit(sort);
  }
}
