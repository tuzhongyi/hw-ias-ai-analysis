import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapFilterComponent } from '../system-map-filter/system-map-filter.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSourceTableComponent } from '../system-map-source-table/system-map-source-table.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';
import {
  SystemMapShopArgs,
  SystemMapShopFilterArgs,
  SystemMapShopRadiusArgs,
} from './system-map.model';
import { SystemMapProviders } from './system-map.provider';
import { SystemMapTrigger } from './trigger/system-map.trigger';

@Component({
  selector: 'ias-system-map',
  imports: [
    CommonModule,
    SystemMapStateComponent,
    SystemMapFilterComponent,
    SystemMapControlsComponent,
    SystemMapEditorCircleComponent,
    SystemMapSourceTableComponent,
    SystemMapPanelDetailsShopComponent,
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
  args = new SystemMapShopArgs();
  datas: Shop[] = [];

  ngOnInit(): void {
    // 定位
    this.init();
    // 初始化占位
    this.trigger.init();
    // 注册事件
    this.regist.amap();
    this.regist.panel();
  }
  ngOnDestroy(): void {
    this.controller.amap.destroy();
  }

  init() {
    this.business.one().then((x) => {
      if (x && x.Location) {
        this.amap.init(x.Location);
      }
    });
  }
  regist = {
    amap: () => {
      this.amap.event.circle.opened.subscribe((x) => {
        this.args.radius = new SystemMapShopRadiusArgs();
        this.args.radius.center.X = x[0];
        this.args.radius.center.Y = x[1];
        this.args.radius.distance = x[2];
      });
      this.amap.event.circle.change.subscribe((x) => {
        if (this.args.radius) {
          this.args.radius.distance = x;
        }
      });
      this.amap.event.circle.move.subscribe((center) => {
        if (this.args.radius) {
          this.args.radius.center.X = center[0];
          this.args.radius.center.Y = center[1];
        }
      });
    },
    panel: () => {
      this.panel.source.change.subscribe((x) => {
        if (x) {
          this.args.filter = new SystemMapShopFilterArgs();
        }
      });
      this.panel.source.load.subscribe((x) => {
        this.args.filter = x;
        this.load(this.args);
      });
      this.panel.editor.circle.load.subscribe((x) => {
        this.args.radius = x;
        this.load(this.args);
      });
      this.panel.editor.circle.clear.subscribe(() => {
        this.args.radius = undefined;
      });
    },
  };

  load(args: SystemMapShopArgs) {
    this.business.load(args).then((x) => {
      this.datas = x;
      this.amap.load(x);
    });
  }

  onsearch() {
    this.load(this.args);
  }
}
