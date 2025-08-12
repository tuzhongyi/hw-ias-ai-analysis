import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Road } from '../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemMainMapBusiness } from './business/system-main-map.business';
import { SystemMainMapController } from './controller/system-main-map.controller';

@Component({
  selector: 'ias-system-main-map',
  imports: [],
  templateUrl: './system-main-map.component.html',
  styleUrl: './system-main-map.component.less',
  providers: [SystemMainMapBusiness, SystemMainMapController],
})
export class SystemMainMapComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private business: SystemMainMapBusiness,
    private controller: SystemMainMapController
  ) {}

  private data = {
    shops: [] as ShopRegistration[],
    roads: [] as Road[],
  };

  ngOnInit(): void {
    this.load.shop();
    this.load.road();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  private change = {};
  ngOnDestroy(): void {}

  private load = {
    shop: () => {
      this.business.shop.load().then((datas) => {
        datas.forEach((x) => {
          if (x.AssociatedCount) {
            x.ObjectState = ShopObjectState.Existed;
          } else {
            x.ObjectState = ShopObjectState.Created;
          }
        });
        this.data.shops = datas;

        this.controller.point.load(this.data.shops);
      });
    },
    road: () => {
      this.business.road.load().then((datas) => {
        this.data.roads = datas;
        this.controller.road.load(this.data.roads);
        this.controller.map.focus();
      });
    },
  };
}
