import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapSourceManagerComponent } from '../system-map-source-manager/system-map-source-manager.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemAMapController } from './controller/amap/system-map-amap.controller';
import { SystemMapPanelController } from './controller/panel/system-map-panel.controller';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';
import {
  SystemMapShopArgs,
  SystemMapShopFilterArgs,
  SystemMapShopRadiusArgs,
} from './system-map.model';
import { SystemMapPanel } from './system-map.panel';

@Component({
  selector: 'ias-system-map',
  imports: [
    CommonModule,
    SystemMapStateComponent,
    SystemMapControlsComponent,
    SystemMapEditorCircleComponent,
    SystemMapSourceManagerComponent,
  ],
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.less',
  providers: [
    SystemAMapController,
    SystemMapPanelController,
    SystemMapController,
    SystemMapBusiness,
  ],
})
export class SystemMapComponent implements OnInit {
  constructor(
    private business: SystemMapBusiness,
    private controller: SystemMapController
  ) {}

  panel = new SystemMapPanel();
  args = new SystemMapShopArgs();
  datas: Shop[] = [];

  ngOnInit(): void {
    this.controller.panel.init(this.panel);
    this.init();
    // this.load();
    this.regist();
  }

  regist() {
    this.controller.amap.event.editor.circle.change.subscribe((x) => {
      this.panel.editor.circle.args.distance = x;
    });
    this.controller.amap.event.editor.circle.move.subscribe((center) => {
      this.panel.editor.circle.args.center.X = center[0];
      this.panel.editor.circle.args.center.Y = center[1];
    });
    this.controller.amap.event.map.mousemmove.subscribe((x) => {
      if (!this.panel.position.show) {
        this.panel.position.show = true;
      }
      this.panel.position.point.X = x[0];
      this.panel.position.point.Y = x[1];
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
  trigger = {
    editor: {
      circle: {
        onok: (data: SystemMapShopRadiusArgs) => {
          this.args.clear();
          this.args.radius = data;
          this.load(this.args);
          this.panel.editor.circle.show = false;
        },
        oncancel: () => {
          this.panel.editor.circle.show = false;
        },
        ondistance: (value: number) => {
          this.controller.amap.radius.set(value);
        },
      },
    },
    source: {
      onfilter: (data: SystemMapShopFilterArgs) => {
        this.args.clear();
        this.args.filter = data;
        this.load(this.args);
      },
    },
  };
}
