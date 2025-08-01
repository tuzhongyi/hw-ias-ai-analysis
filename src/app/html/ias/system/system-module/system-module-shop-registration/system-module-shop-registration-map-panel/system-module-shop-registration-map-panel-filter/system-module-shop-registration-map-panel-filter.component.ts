import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSelectRoadComponent } from '../../../../../share/input-select-road/input-select-road.component';
import { SystemMapSearchShopRoadArgs } from '../../../../system-map/system-map-search-shop-road/system-map-search-shop-road.model';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-filter',
  imports: [CommonModule, FormsModule, InputSelectRoadComponent],
  templateUrl:
    './system-module-shop-registration-map-panel-filter.component.html',
  styleUrl: './system-module-shop-registration-map-panel-filter.component.less',
})
export class SystemModuleShopRegistrationMapPanelFilterComponent
  implements OnInit
{
  @Input('data') data?: SystemMapSearchShopRoadArgs;
  @Output() close = new EventEmitter<void>();
  @Output() ok = new EventEmitter<SystemMapSearchShopRoadArgs>();

  ngOnInit(): void {
    if (this.data) {
      this.args = Object.assign(this.args, this.data);
    }
  }

  args: SystemMapSearchShopRoadArgs = {
    road: {},
  };

  on = {
    reset: () => {
      this.args = {
        road: {},
      };
    },
    ok: () => {
      this.ok.emit(this.args);
    },
    cancel: () => {
      this.close.emit();
    },
  };
}
