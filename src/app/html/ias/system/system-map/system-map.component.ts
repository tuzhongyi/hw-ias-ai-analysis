import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { PictureWindowContentComponent } from '../../share/picture-window-content/picture-window-content.component';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapFilterComponent } from '../system-map-filter/system-map-filter.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSearchComponent } from '../system-map-search/system-map-search.component';
import { SystemMapSourceManagerComponent } from '../system-map-source-manager/system-map-source-manager.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemMapStatisticComponent } from '../system-map-statistic/system-map-statistic.component';
import { SystemMapRoadArgs } from './business/system-map-road.model';
import { SystemMapShopArgs } from './business/system-map-shop.model';
import { SystemMapBusiness } from './business/system-map.business';
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
    SystemMapPanelDetailsShopComponent,
    WindowComponent,
    PictureWindowContentComponent,
    SystemMapSourceManagerComponent,
  ],
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

  onsearch() {
    this.load.shop(this.args.shop, this.args.distance);
    this.load.road(this.args.road, this.args.distance);
    this.panel.source.show = true;
  }

  onpicture(shop: Shop) {
    this.window.picture.id = shop.ImageUrl;
    this.window.picture.title = shop.Name;
    this.window.picture.show = true;
  }
}
