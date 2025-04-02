import { Component, OnDestroy, OnInit } from '@angular/core';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapRoadArgs } from './business/road/system-map-road.model';
import {
  SystemMapShopArgs,
  SystemMapTaskShopArgs,
} from './business/system-map-shop.model';
import { SystemMapBusiness } from './business/system-map.business';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapImports } from './system-map.import';
import {
  SystemMapArgs,
  SystemMapDistanceArgs,
  SystemMapFilterType,
} from './system-map.model';
import { SystemMapProviders } from './system-map.provider';
import { SystemMapTrigger } from './trigger/system-map.trigger';

@Component({
  selector: 'ias-system-map',
  imports: [...SystemMapImports],
  templateUrl: './system-map.component.html',
  styleUrls: ['./system-map.component.less', './less/system-map-panel.less'],
  providers: [...SystemMapProviders],
})
export class SystemMapComponent implements OnInit, OnDestroy {
  constructor(
    private business: SystemMapBusiness,
    private controller: SystemMapController,
    private trigger: SystemMapTrigger
  ) {}

  get panel() {
    return this.controller.panel;
  }
  get amap() {
    return this.controller.amap;
  }
  get window() {
    return this.controller.window;
  }
  args = new SystemMapArgs();
  shops: Shop[] = [];
  roads: Road[] = [];
  type = SystemMapFilterType.shop;

  ngOnInit(): void {
    // 初始化占位
    this.trigger.init();
    // 注册事件
    this.regist.amap();
    this.regist.panel();

    this.load.shop(this.args.shop, this.args.distance).then((x) => {
      this.panel.statistic.count.shop = x.length;
    });
    this.load.road(this.args.road, this.args.distance);
  }
  ngOnDestroy(): void {
    this.controller.amap.destroy();
  }

  regist = {
    amap: () => {
      this.amap.event.map.completed.subscribe((x) => {
        this.args.distance.center.X = x[0];
        this.args.distance.center.Y = x[1];
        this.args.distance.distance = 100;
      });
      this.amap.event.circle.opened.subscribe((x) => {
        this.args.distance.enabled = true;
      });
      this.amap.event.circle.change.subscribe((x) => {
        this.args.distance.distance = x;
      });
      this.amap.event.circle.move.subscribe((center) => {
        this.args.distance.center.X = center[0];
        this.args.distance.center.Y = center[1];
      });
    },
    panel: () => {
      this.panel.source.shop.select.subscribe((x) => {
        if (x.Location) {
          this.args.distance.center.X = x.Location.Longitude;
          this.args.distance.center.Y = x.Location.Latitude;
        }
      });
      this.panel.editor.circle.load.subscribe((x) => {
        this.args.distance = x;
        this.load.shop(this.args.shop, this.args.distance);
        this.load.road(this.args.road, this.args.distance);
      });
      this.panel.editor.circle.clear.subscribe(() => {
        this.args.distance.enabled = false;
        this.load.shop(this.args.shop, this.args.distance);
        this.load.road(this.args.road, this.args.distance);
      });
      this.panel.filter.load.subscribe(() => {
        this.load.shop(this.args.shop, this.args.distance);
        this.load.road(this.args.road, this.args.distance);
      });
      this.panel.task.compare.subscribe((args) => {
        this.args.shop.task = args;
        this.load.shop(this.args.shop, this.args.distance);
        this.panel.state.show = true;
      });
      this.panel.task.return.subscribe(() => {
        this.panel.state.reset();
        this.panel.state.show = false;
      });
      this.panel.task.change.subscribe((show) => {
        if (show) {
          this.args.shop.task = new SystemMapTaskShopArgs();
        } else {
          this.args.shop.task = undefined;
          this.load.shop(this.args.shop, this.args.distance);
        }
      });
      this.panel.state.selected.subscribe((states) => {
        let shops = this.shops.filter((shop) => {
          return states.includes(shop.ObjectState);
        });
        console.log(states);
        this.amap.shop.load(shops);
      });
    },
  };

  load = {
    shop: (args: SystemMapShopArgs, distance: SystemMapDistanceArgs) => {
      return new Promise<Shop[]>((resolve) => {
        this.business.shop.load(args, distance).then((x) => {
          resolve(x);
          this.shops = x;

          this.amap.shop.load(x);
        });
      });
    },
    road: (args: SystemMapRoadArgs, distance: SystemMapDistanceArgs) => {
      return new Promise<Road[]>((resolve) => {
        this.business.road.load(args, distance).then((x) => {
          resolve(x);
          this.roads = x;
          this.amap.road.load(x);
        });
      });
    },
  };

  onsearch(name: string) {
    this.args.name = name;
    this.load.shop(this.args.shop, this.args.distance);
    if (this.panel.task.show) {
      this.panel.task.name = name;
      this.panel.task.load.emit(this.panel.task.name);
    } else {
      this.load.road(this.args.road, this.args.distance);
      this.panel.source.show = true;
    }
  }

  onpicture(shop: Shop) {
    this.window.picture.id = shop.ImageUrl;
    this.window.picture.title = shop.Name;
    this.window.picture.show = true;
  }
}
