import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../../../common/data-core/models/arm/analysis/road.model';

import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';
import { GeoDirectionSort } from '../../../../../common/tools/geo-tool/geo.model';
import { DirectionSortControlComponent } from '../../../share/direction-sort-control/direction-sort-control.component';
import { SystemMapFilterType } from '../component/system-map.model';
import { SystemMapSourceTableRoadComponent } from '../system-map-source-table-road/system-map-source-table-road.component';
import { SystemMapSourceTableShopComponent } from '../system-map-source-table-shop/system-map-source-table-shop.component';

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
  @Input() shops: IShop[] = [];
  @Input() roads: Road[] = [];

  @Input() type = SystemMapFilterType.shop;
  @Output() typeChange = new EventEmitter<SystemMapFilterType>();

  @Output() details = new EventEmitter<IShop>();
  @Input() selected?: IShop;
  @Output() selectedChange = new EventEmitter<IShop | Road>();

  @Output() itemhover = new EventEmitter<IShop>();
  @Output() itemblur = new EventEmitter<IShop>();
  @Output() position = new EventEmitter<IShop | Road>();

  constructor() {}

  Type = SystemMapFilterType;
  sort = new GeoDirectionSort();
  tosort = new EventEmitter<GeoDirectionSort>();

  ngOnInit(): void {}

  ontype(type: SystemMapFilterType) {
    this.type = type;
    this.typeChange.emit(type);
  }

  onselected(data?: IShop | Road) {
    this.selectedChange.emit(data);
  }
  ondetails(data: IShop) {
    this.details.emit(data);
  }
  onposition(data: IShop | Road) {
    this.position.emit(data);
  }
  onmouseover(data: IShop) {
    this.itemhover.emit(data);
  }
  onmouseout(data: IShop) {
    this.itemblur.emit(data);
  }

  onsort(sort: GeoDirectionSort) {
    this.tosort.emit(sort);
  }
}
