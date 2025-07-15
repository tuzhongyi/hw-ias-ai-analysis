import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../../../common/data-core/models/arm/geographic/road.model';
import { InputSelectRoadComponent } from '../../../share/input-select-road/input-select-road.component';
import { SystemMapSearchShopRoadArgs } from './system-map-search-shop-road.model';

@Component({
  selector: 'ias-system-map-search-shop-road',
  imports: [CommonModule, FormsModule, InputSelectRoadComponent],
  templateUrl: './system-map-search-shop-road.component.html',
  styleUrl: './system-map-search-shop-road.component.less',
})
export class SystemMapSearchShopRoadComponent {
  @Input() clearable = true;

  @Output() search = new EventEmitter<SystemMapSearchShopRoadArgs>();

  constructor() {}

  type = 0;
  name?: string;
  road: {
    on?: Road;
    ori?: Road;
  } = {};

  searched = false;
  clear = false;

  on = {
    select: {
      change: () => {
        this.on.clear();
      },
    },

    search: () => {
      this.searched = true;
      this.search.emit({ name: this.name, road: this.road });
    },
    clear: () => {
      this.name = undefined;
      this.road.on = undefined;
      this.road.ori = undefined;
      this.clear = true;
      if (this.searched) {
        this.searched = false;
        this.search.emit({ name: this.name, road: this.road });
      }
    },
  };
}
