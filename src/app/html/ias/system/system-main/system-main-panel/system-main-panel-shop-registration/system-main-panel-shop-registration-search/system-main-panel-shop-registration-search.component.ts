import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSelectRoadComponent } from '../../../../../share/input-select-road/input-select-road.component';
import { SystemMapSearchShopRoadComponent } from '../../../../system-map/system-map-search-shop-road/system-map-search-shop-road.component';

@Component({
  selector: 'ias-system-main-panel-shop-registration-search',
  imports: [CommonModule, FormsModule, InputSelectRoadComponent],
  templateUrl: './system-main-panel-shop-registration-search.component.html',
  styleUrl: './system-main-panel-shop-registration-search.component.less',
})
export class SystemMainPanelShopRegistrationSearchComponent extends SystemMapSearchShopRoadComponent {}
