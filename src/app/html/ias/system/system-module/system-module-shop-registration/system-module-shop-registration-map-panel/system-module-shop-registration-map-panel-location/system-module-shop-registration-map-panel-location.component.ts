import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SetShopLocationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { SystemModuleShopRegistrationMapPanelLocationBusiness } from './system-module-shop-registration-map-panel-location.business';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-location',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    TextSpaceBetweenDirective,
    WheelInputNumberDirective,
  ],
  templateUrl:
    './system-module-shop-registration-map-panel-location.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-location.component.less',
  providers: [SystemModuleShopRegistrationMapPanelLocationBusiness],
})
export class SystemModuleShopRegistrationMapPanelLocationComponent
  implements OnInit
{
  @Output() close = new EventEmitter<void>();
  @Output() ok = new EventEmitter<ShopRegistration[]>();

  constructor(
    private business: SystemModuleShopRegistrationMapPanelLocationBusiness,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.road.load().then((x) => {
      this.road.datas = x;
    });
  }

  road = {
    datas: [] as Road[],
    selected: undefined as Road | undefined,
  };

  side?: number;
  distance: number = 5;

  on = {
    reset: () => {
      this.road.selected = undefined;
      this.side = undefined;
      this.distance = 5;
    },
    ok: () => {
      if (!this.road.selected) {
        this.toastr.warning('请选择门面道路');
        return;
      }
      let params = new SetShopLocationsParams();
      params.Distance = this.distance;
      params.ShopSide = this.side;
      params.OriRoadId = this.road.selected.Id;
      this.business.preview(params).then((x) => {
        this.ok.emit(x);
      });
    },
    cancel: () => {
      this.close.emit();
    },
  };
}
