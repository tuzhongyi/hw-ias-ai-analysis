import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../common/data-core/models/arm/geographic/road.model';
import { Paged } from '../../../../../common/data-core/models/page-list.model';
import { SystemMapPanelDetailsShopRegistrationComponent } from '../system-map-panel-details-shop-registration/system-map-panel-details-shop-registration.component';
import { TaskCompareType } from '../system-map-task/system-map-task-manager/system-map-task-manager.model';

import { CommonModule } from '@angular/common';
import { PictureListComponent } from '../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../share/window/window.component';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapFilterComponent } from '../system-map-filter/system-map-filter.component';
import { SystemMapPanelDetailsShopSignComponent } from '../system-map-panel-details-shop-sign/system-map-panel-details-shop-sign.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSearchComponent } from '../system-map-search/system-map-search.component';
import { SystemMapSettingCompareComponent } from '../system-map-settings/system-map-setting-compare/system-map-setting-compare.component';
import { SystemMapSourceManagerComponent } from '../system-map-source-manager/system-map-source-manager.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemMapStatisticComponent } from '../system-map-statistic/system-map-statistic.component';
import { SystemMapTaskManagerComponent } from '../system-map-task/system-map-task-manager/system-map-task-manager.component';
import { SystemMapRoadArgs } from './business/road/system-map-road.model';
import { SystemMapShopArgs } from './business/shop/system-map-shop.model';
import { SystemMapBusiness } from './business/system-map.business';
import { SystemMapTaskArgs } from './business/task/system-map-task.model';
import {
  SystemMapShopSource,
  SystemMapSource,
} from './controller/source/system-map.source';
import { SystemMapController } from './controller/system-map.controller';
import {
  SystemMapArgs,
  SystemMapDistanceArgs,
  SystemMapFilterType,
} from './system-map.model';
import { SystemMapProviders } from './system-map.provider';
import { SystemMapTrigger } from './trigger/system-map.trigger';

@Component({
  selector: 'ias-system-map',
  imports: [
    CommonModule,
    SystemMapStateComponent,
    SystemMapSearchComponent,
    SystemMapFilterComponent,
    SystemMapControlsComponent,
    SystemMapEditorCircleComponent,
    SystemMapStatisticComponent,
    SystemMapPanelDetailsShopRegistrationComponent,
    SystemMapPanelDetailsShopComponent,
    WindowComponent,
    PictureListComponent,
    SystemMapSourceManagerComponent,
    SystemMapTaskManagerComponent,
    SystemMapPanelDetailsShopSignComponent,

    SystemMapSettingCompareComponent,
    SystemMapPanelDetailsShopRegistrationComponent,
  ],
  templateUrl: './system-map.component.html',
  styleUrls: ['./system-map.component.less', './less/system-map-panel.less'],
  providers: [...SystemMapProviders],
})
export class SystemMapComponent implements OnInit, OnDestroy {
  constructor(
    private business: SystemMapBusiness,
    private controller: SystemMapController,
    private trigger: SystemMapTrigger,
    public source: SystemMapSource
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
      this.panel.source.change.subscribe((show) => {
        if (show) {
        } else {
          if (this.args.name) {
            this.args.name = '';
            this.onsearch(this.args.name);
          }
        }
      });
      this.panel.source.shop.select.subscribe((x) => {
        if (x.Location) {
          this.args.distance.center.X = x.Location.GCJ02.Longitude;
          this.args.distance.center.Y = x.Location.GCJ02.Latitude;
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
        this.args.name = '';
        this.args.task = args;
        switch (args.type) {
          case TaskCompareType.base:
            this.load.task.base(this.args.task);
            break;
          case TaskCompareType.registration:
            this.load.task.registration(this.args.task);
            break;
          default:
            this.load.task.eachother(this.args.task);
            break;
        }
        this.panel.state.show = true;
      });
      this.panel.task.return.subscribe(() => {
        this.args.name = '';
      });
      this.panel.task.change.subscribe((show) => {
        if (show) {
          this.args.task = new SystemMapTaskArgs();
        } else {
          this.args.name = '';
          this.load.shop(this.args.shop, this.args.distance);
        }
      });
      this.panel.state.selected.subscribe((states) => {
        let shops = this.source.shop.filter((shop) => {
          return states.includes(shop.ObjectState);
        });
        this.amap.shop.load(shops);
      });
      this.panel.details.analysis.sign.select.subscribe((x) => {
        if (this.window.picture.show) {
          this.window.picture.id = x.ImageUrl;
          this.window.picture.title = x.Text ?? '';
          this.window.picture.polygon = x.Polygon ?? [];
        }
      });
    },
  };

  load = {
    shop: (args: SystemMapShopArgs, distance: SystemMapDistanceArgs) => {
      return new Promise<IShop[]>((resolve) => {
        this.business.shop.load(args, distance).then((x) => {
          resolve(x);
          this.source.shop = new SystemMapShopSource(...x);

          this.amap.shop.load(x);
        });
      });
    },
    road: (args: SystemMapRoadArgs, distance: SystemMapDistanceArgs) => {
      return new Promise<Road[]>((resolve) => {
        this.business.road.load(args, distance).then((x) => {
          resolve(x);
          this.source.road = x;
          this.amap.road.load(x);
        });
      });
    },
    task: {
      eachother: (args: SystemMapTaskArgs) => {
        return new Promise<IShop[]>((resolve) => {
          this.business.task.compare.load(args).then((x) => {
            this.source.shop = new SystemMapShopSource(...x);
            this.amap.shop.load(x);
            resolve(x);
          });
        });
      },
      base: (args: SystemMapTaskArgs) => {
        return new Promise<IShop[]>((resolve) => {
          this.business.task.base.load(args).then((x) => {
            this.source.shop = new SystemMapShopSource(...x);
            this.amap.shop.load(x);
            resolve(x);
          });
        });
      },
      registration: (args: SystemMapTaskArgs) => {
        return new Promise<IShop[]>((resolve) => {
          this.business.task.registration.load(args).then((x) => {
            this.panel.details.registration.datas = x;

            let shop = new SystemMapShopSource();
            let shops = x.filter((x) => !!x.Shop).map((x) => x.Shop!);
            let disappeareds = x
              .filter((x) => !x.Shop && !!x.ShopRegistration)
              .map((x) => x.ShopRegistration!);
            disappeareds.forEach((item) => {
              item.ObjectState = ShopObjectState.Disappeared;
            });
            shop = new SystemMapShopSource(...shops, ...disappeareds);
            this.source.shop = shop;

            this.amap.shop.load(this.source.shop);

            resolve(this.source.shop);
          });
        });
      },
    },
  };

  async onsearch(name: string) {
    this.args.name = name;

    if (this.panel.task.show) {
      if (this.panel.task.compared) {
        this.source.search.shop.on(name);
        this.amap.shop.load(this.source.shop);
      } else {
        this.panel.task.name = name;
        this.panel.task.load.emit(this.panel.task.name);
      }
    } else {
      if (this.panel.editor.circle.show) {
        this.panel.editor.circle.show = false;
        this.args.distance.enabled = false;
      }
      await this.load.shop(this.args.shop, this.args.distance);
      await this.load.road(this.args.road, this.args.distance);
      if (name) {
        this.panel.source.show = true;
      }
    }
  }

  onpicture(item: Paged<ShopSign> | IShop) {
    if (item instanceof Paged) {
      let data = item.Data;
      this.window.picture.id = data.ImageUrl;
      this.window.picture.title = data.Text ?? '';
      this.window.picture.polygon = data.Polygon ?? [];
      this.window.picture.page = item.Page;
      this.window.picture.show = true;
    } else {
      this.window.picture.id = item.ImageUrl;
      this.window.picture.title = item.Name ?? '';
      this.window.picture.polygon = [];
      this.window.picture.page = undefined;
      this.window.picture.show = true;
    }
  }
}
