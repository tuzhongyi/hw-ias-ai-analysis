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
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemTaskRouteMapPathBusiness } from './business/system-task-route-map-path.business';
import { SystemTaskRouteMapRoadBusiness } from './business/system-task-route-map-road.business';
import { SystemTaskRouteMapShopAnalysisBusiness } from './business/system-task-route-map-shop-analysis.business';
import { SystemTaskRouteMapShopRegistrationBusiness } from './business/system-task-route-map-shop-registration.business';
import { SystemTaskRouteMapShopBusiness } from './business/system-task-route-map-shop.business';
import { SystemTaskRouteMapBusiness } from './business/system-task-route-map.business';
import { SystemTaskRouteMapAMapController } from './controller/amap/system-task-route-map-amap.controller';
import { SystemTaskRouteMapController } from './controller/system-task-route-map.controller';
import { SystemTaskRouteMapArgs } from './system-task-route-map.model';

@Component({
  selector: 'ias-system-task-route-map',
  imports: [],
  templateUrl: './system-task-route-map.component.html',
  styleUrl: './system-task-route-map.component.less',
  providers: [
    SystemTaskRouteMapController,
    SystemTaskRouteMapAMapController,

    SystemTaskRouteMapBusiness,
    SystemTaskRouteMapRoadBusiness,
    SystemTaskRouteMapPathBusiness,
    SystemTaskRouteMapShopBusiness,
    SystemTaskRouteMapShopRegistrationBusiness,
    SystemTaskRouteMapShopAnalysisBusiness,
  ],
})
export class SystemTaskRouteMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('data') task?: AnalysisTask;
  @Input('load') _load?: EventEmitter<SystemTaskRouteMapArgs>;
  @Input() rectified: boolean = true;
  @Input() focus?: EventEmitter<ShopRegistration>;
  @Input() over?: EventEmitter<ShopRegistration>;
  @Input() out?: EventEmitter<ShopRegistration>;
  @Output() current = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<ShopRegistrationTaskDetectedResult[]>();
  @Output() pointclick = new EventEmitter<IShop>();

  constructor(
    private controller: SystemTaskRouteMapController,
    private business: SystemTaskRouteMapBusiness
  ) {}

  private subscription = new Subscription();
  private data = {
    result: [] as ShopRegistrationTaskDetectedResult[],
    analysis: [] as Shop[],
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
  }
  private change = {
    rectified: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.task) {
          this.load.path(this.task.Id, this.rectified);
        }
      }
    },
  };

  ngOnInit(): void {
    this.load.road();

    if (this.task) {
      this.load.path(this.task.Id, this.rectified);
      this.load.shop.load(this.task.Id);
    }

    this.regist.controller();
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
    path: (id: string, rectified: boolean) => {
      this.controller.amap.path.clear().then((x) => {
        this.business.path.load(id, rectified).then((gps) => {
          this.controller.amap.path.load(gps);
        });
      });
    },
    shop: {
      load: async (taskId: string) => {
        this.data.result = await this.business.shop.registration.load(taskId);
        // let analysis = await this.business.shop.analysis.load(taskId);
        // let ids = this.data.result.map((x) => x.Id);
        // let shops = analysis.filter((x) => {
        //   if (x.Marking) {
        //     return false;
        //   }
        //   if (x.RegistrationId) {
        //     return !ids.includes(x.RegistrationId);
        //   }
        //   return false;
        // });
        // ids = shops.map((x) => x.Id);
        // shops = await this.business.shop.registration.contains(shops);
        this.controller.amap.point.load(this.data.result, []);
        this.loaded.emit(this.data.result);
      },
      filter: (args: SystemTaskRouteMapArgs) => {
        let result = this.data.result;
        let analysis = this.data.analysis;
        if (args.name) {
          let name = args.name.toLocaleLowerCase();
          result = this.data.result.filter((x) =>
            x.Name.toLocaleLowerCase().includes(name)
          );
          analysis = this.data.analysis.filter((x) =>
            x.Name.toLocaleLowerCase().includes(name)
          );
        }
        if (args.detecteds.length == 1) {
          result = result.filter((x) => x.Detected === args.detecteds[0]);
        } else if (args.detecteds.length === 0) {
          result = [];
        } else {
        }
        this.controller.amap.point.clear().then(() => {
          this.controller.amap.point.load(result, analysis);
          this.loaded.emit(result);
        });
      },
    },
  };
  private regist = {
    input: () => {
      if (this._load) {
        let sub = this._load.subscribe((x) => {
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
    },
    controller: () => {
      this.controller.amap.event.path.dblclick.subscribe((x) => {
        this.current.emit(x);
      });
      this.controller.amap.event.point.click.subscribe((x) => {
        this.pointclick.emit(x);
      });
    },
  };
}
