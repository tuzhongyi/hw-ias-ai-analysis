import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapPanelDetailsShopComponent } from '../system-map-panel-details-shop/system-map-panel-details-shop.component';
import { SystemMapSourceManagerComponent } from '../system-map-source-manager/system-map-source-manager.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';
import { SystemMapShopArgs, SystemMapShopRadiusArgs } from './system-map.model';
import { SystemMapProviders } from './system-map.provider';

@Component({
  selector: 'ias-system-map',
  imports: [
    CommonModule,
    SystemMapStateComponent,
    SystemMapControlsComponent,
    SystemMapEditorCircleComponent,
    SystemMapSourceManagerComponent,
    SystemMapPanelDetailsShopComponent,
  ],
  templateUrl: './system-map.component.html',
  styleUrls: ['./system-map.component.less', './less/system-map-panel.less'],
  providers: [...SystemMapProviders],
})
export class SystemMapComponent implements OnInit, OnDestroy {
  constructor(
    private business: SystemMapBusiness,
    private controller: SystemMapController
  ) {}

  get panel() {
    return this.controller.panel;
  }
  args = new SystemMapShopArgs();
  datas: Shop[] = [];

  ngOnInit(): void {
    this.init();
    // this.load();
    this.panel.editor.circle.load.subscribe((x) => {
      this.args.clear();
      this.args.radius = x;
      this.load(this.args);
    });
    this.panel.source.load.subscribe((x) => {
      this.args.clear();
      this.args.filter = x;
      this.load(this.args);
    });
    this.controller.amap.event.editor.circle.change.subscribe((x) => {
      if (!this.args.radius) {
        this.args.radius = new SystemMapShopRadiusArgs();
      }
      this.args.radius.distance = x;
    });
    this.controller.amap.event.editor.circle.move.subscribe((center) => {
      if (!this.args.radius) {
        this.args.radius = new SystemMapShopRadiusArgs();
      }
      this.args.radius.center.X = center[0];
      this.args.radius.center.Y = center[1];
    });
  }

  init() {
    this.business.one().then((x) => {
      if (x && x.Location) {
        this.controller.amap.init(x.Location);
      }
    });
  }

  load(args: SystemMapShopArgs) {
    this.business.load(args).then((x) => {
      this.datas = x;
      this.controller.amap.load(x);
    });
  }

  control = {
    onradius: () => {
      this.panel.editor.circle.show = !this.panel.editor.circle.show;
    },
    onsource: () => {
      this.panel.source.show = !this.panel.source.show;
    },
  };

  ngOnDestroy(): void {
    this.controller.amap.destroy();
  }
}
