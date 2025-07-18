import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemModuleShopRegistrationMapRoadBusiness } from './business/system-module-shop-registration-map-road.business';
import { SystemModuleShopRegistrationMapShopRegistrationBusiness } from './business/system-module-shop-registration-map-shop-registration.business';
import { SystemModuleShopRegistrationMapBusiness } from './business/system-module-shop-registration-map.business';
import { SystemModuleShopRegistrationMapAMapController } from './controller/amap/system-module-shop-registration-map-amap.controller';
import { SystemModuleShopRegistrationMapController } from './controller/system-module-shop-registration-map.controller';
import { SystemModuleShopRegistrationMapArgs } from './system-module-shop-registration-map.model';

@Component({
  selector: 'ias-system-module-shop-registration-map',
  imports: [],
  templateUrl: './system-module-shop-registration-map.component.html',
  styleUrl: './system-module-shop-registration-map.component.less',
  providers: [
    SystemModuleShopRegistrationMapRoadBusiness,
    SystemModuleShopRegistrationMapShopRegistrationBusiness,
    SystemModuleShopRegistrationMapBusiness,

    SystemModuleShopRegistrationMapAMapController,
    SystemModuleShopRegistrationMapController,
  ],
})
export class SystemModuleShopRegistrationMapComponent
  implements OnInit, OnDestroy
{
  @Input('load') input_load?: EventEmitter<SystemModuleShopRegistrationMapArgs>;
  @Output() loaded = new EventEmitter<ShopRegistration[]>();
  @Input() changed: ShopRegistration[] = [];
  @Output() changedChange = new EventEmitter<ShopRegistration[]>();

  @Input() focus?: EventEmitter<ShopRegistration>;
  @Input() over?: EventEmitter<ShopRegistration>;
  @Input() out?: EventEmitter<ShopRegistration>;
  @Input() revoke?: EventEmitter<ShopRegistration>;

  constructor(
    private business: SystemModuleShopRegistrationMapBusiness,
    private controller: SystemModuleShopRegistrationMapController
  ) {}

  private datas: ShopRegistration[] = [];
  private subscription = new Subscription();

  ngOnInit(): void {
    this.load.road();
    this.load.shop.load();
    this.regist.map();
    this.regist.input();
  }

  ngOnDestroy(): void {
    this.controller.amap.map.destory();
    this.subscription.unsubscribe();
  }

  private load = {
    road: () => {
      this.business.road.load().then((x) => {
        this.controller.amap.road.load(x);
      });
    },
    shop: {
      load: async () => {
        this.datas = await this.business.registration.load();
        this.controller.amap.point.load(this.datas);
        this.loaded.emit(this.datas);
      },
      filter: (args: SystemModuleShopRegistrationMapArgs) => {
        let datas = [...this.datas];
        if (args.name) {
          let name = args.name.toLocaleLowerCase();
          datas = datas.filter((x) =>
            x.Name.toLocaleLowerCase().includes(name)
          );
        }
        if (args.road) {
          if (args.road.on) {
            datas = datas.filter((x) => x.RoadId === args.road?.on?.Id);
          }
          if (args.road.ori) {
            datas = datas.filter((x) => x.OriRoadId === args.road?.ori?.Id);
          }
        }
        this.controller.amap.point.clear().then(() => {
          this.controller.amap.point.load(datas);
          this.loaded.emit(datas);
        });
      },
    },
  };
  private regist = {
    input: () => {
      if (this.input_load) {
        let sub = this.input_load.subscribe((x) => {
          this.load.shop.filter(x);
        });
        this.subscription.add(sub);
      }
      if (this.focus) {
        let sub = this.focus.subscribe((x) => {
          this.controller.amap.point.focus(x);
        });
        this.subscription.add(sub);
      }
      if (this.over) {
        let sub = this.over.subscribe((x) => {
          this.controller.amap.point.over(x);
        });
        this.subscription.add(sub);
      }
      if (this.out) {
        let sub = this.out.subscribe((x) => {
          this.controller.amap.point.out(x);
        });
        this.subscription.add(sub);
      }
      if (this.revoke) {
        let sub = this.revoke.subscribe((changed) => {
          let data = this.datas.find((x) => x.Id === changed.Id);
          if (data) {
            this.controller.amap.point.revoke(data);
          }
        });
        this.subscription.add(sub);
      }
    },
    map: () => {
      this.controller.amap.event.point.dragend.subscribe((data) => {
        let index = this.changed.findIndex((x) => x.Id === data.Id);
        if (index < 0) {
          this.changed.push(data);
        } else {
          this.changed[index] = data;
        }
        this.changedChange.emit(this.changed);
      });
    },
  };
}
