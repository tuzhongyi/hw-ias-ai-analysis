import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
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
  implements OnInit, OnChanges, OnDestroy
{
  @Input('load') input_load?: EventEmitter<SystemModuleShopRegistrationMapArgs>;
  @Input() args = new SystemModuleShopRegistrationMapArgs();
  @Output() loaded = new EventEmitter<ShopRegistration[]>();
  @Input() changed: ShopRegistration[] = [];
  @Output() changedChange = new EventEmitter<ShopRegistration[]>();
  @Output() selected = new EventEmitter<ShopRegistration>();

  @Input() focus?: EventEmitter<ShopRegistration>;
  @Input() over?: EventEmitter<ShopRegistration>;
  @Input() out?: EventEmitter<ShopRegistration>;
  @Input() revoke?: EventEmitter<ShopRegistration>;
  @Input() filter?: EventEmitter<SystemModuleShopRegistrationMapArgs>;
  @Input() clean?: EventEmitter<void>;
  @Input() draggable = false;

  constructor(
    private business: SystemModuleShopRegistrationMapBusiness,
    private controller: SystemModuleShopRegistrationMapController
  ) {}

  private datas: ShopRegistration[] = [];
  private subscription = new Subscription();
  private changing = {
    changed: false,
  };

  ngOnInit(): void {
    this.load.road();
    this.load.shop.load(this.args).finally(() => {
      this.controller.amap.map.view();
    });
    this.regist.map();
    this.regist.input();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.draggable(changes['draggable']);
    this.change.changed(changes['changed']);
  }
  private change = {
    draggable: (simple: SimpleChange) => {
      if (simple) {
        this.controller.amap.point.draggable(this.draggable);
      }
    },
    changed: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.changing.changed) {
          this.changing.changed = false;
          return;
        }
        if (this.changed && this.changed.length > 0) {
          this.controller.amap.point.location(this.changed);
        }
      }
    },
  };

  ngOnDestroy(): void {
    this.controller.amap.map.destory();
    this.subscription.unsubscribe();
  }

  private load = {
    road: () => {
      this.business.road.load().then((x) => {
        this.controller.amap.road.load(x).then((x) => {
          this.controller.amap.map.view();
        });
      });
    },
    shop: {
      load: async (args: SystemModuleShopRegistrationMapArgs) => {
        this.datas = await this.business.registration.load();
        this.load.shop.filter(args);
      },
      filter: (args: SystemModuleShopRegistrationMapArgs) => {
        return new Promise<ShopRegistration[]>((resolve) => {
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
            if (args.side) {
              datas = datas.filter((x) => x.ShopSide === args.side);
            }
          }
          if (args.ids && args.ids.length > 0) {
            datas = datas.filter((x) => (args.ids ?? []).includes(x.Id));
          }
          resolve(datas);

          this.controller.amap.point.clear().then(() => {
            this.controller.amap.point.load(datas);
            this.loaded.emit(datas);
          });
        });
      },
    },
  };
  private regist = {
    input: () => {
      if (this.input_load) {
        let sub = this.input_load.subscribe((x) => {
          this.args = x;

          this.load.shop.load(this.args);
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
      if (this.filter) {
        let sub = this.filter.subscribe((x) => {
          this.load.shop.filter(x);
        });
        this.subscription.add(sub);
      }
      if (this.clean) {
        let sub = this.clean.subscribe(() => {
          this.controller.amap.point.clear().then(() => {
            this.loaded.emit([]);
          });
        });
        this.subscription.add(sub);
      }
    },
    map: () => {
      this.controller.amap.event.point.dragend.subscribe((data) => {
        let index = this.changed.findIndex((x) => x.Id === data.Id);
        if (index < 0) {
          this.changed.unshift(data);
        } else {
          this.changed[index] = data;
        }
        this.changing.changed = true;
        this.changedChange.emit(this.changed);
      });
      this.controller.amap.event.point.click.subscribe((data) => {
        this.selected.emit(data);
      });
    },
  };
}
