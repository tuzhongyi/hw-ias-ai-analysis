import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapFilterComponent } from '../system-map-filter/system-map-filter.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSearchComponent } from '../system-map-search/system-map-search.component';
import { SystemMapSourceTableComponent } from '../system-map-source-table/system-map-source-table.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemMapStatisticComponent } from '../system-map-statistic/system-map-statistic.component';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';
import { SystemMapShopArgs } from './system-map.model';
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
    SystemMapSourceTableComponent,
    SystemMapStatisticComponent,
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

    this.load(this.args).then((x) => {
      this.panel.statistic.count.shop = x.length;
    });
  }
  ngOnDestroy(): void {
    this.controller.amap.destroy();
  }

  init() {
    this.business.one().then((x) => {
      if (x && x.Location) {
        this.amap.init(x.Location);
        this.args.dsitance.center.X = x.Location.Longitude;
        this.args.dsitance.center.Y = x.Location.Latitude;
        this.args.dsitance.distance = 100;
      }
    });
  }
  regist = {
    amap: () => {
      this.amap.event.circle.opened.subscribe((x) => {
        this.args.dsitance.enabled = true;
      });
      this.amap.event.circle.change.subscribe((x) => {
        this.args.dsitance.distance = x;
      });
      this.amap.event.circle.move.subscribe((center) => {
        this.args.dsitance.center.X = center[0];
        this.args.dsitance.center.Y = center[1];
      });
    },
    panel: () => {
      this.panel.source.load.subscribe((x) => {
        this.args.filter = x;
        this.load(this.args);
      });
      this.panel.source.select.subscribe((x) => {
        if (x.Location) {
          this.args.dsitance.center.X = x.Location.Longitude;
          this.args.dsitance.center.Y = x.Location.Latitude;
        }
      });
      this.panel.editor.circle.load.subscribe((x) => {
        this.args.dsitance = x;
        this.load(this.args);
      });
      this.panel.editor.circle.clear.subscribe(() => {
        this.args.dsitance.enabled = false;
        this.load(this.args);
      });
      this.panel.filter.load.subscribe(() => {
        this.load(this.args);
      });
    },
  };

  load(args: SystemMapShopArgs) {
    return new Promise<Shop[]>((resolve) => {
      this.business.load(args).then((x) => {
        resolve(x);
        this.datas = x;

        this.amap.load(x);
      });
    });
  }

  onsearch() {
    this.load(this.args);
  }
}
