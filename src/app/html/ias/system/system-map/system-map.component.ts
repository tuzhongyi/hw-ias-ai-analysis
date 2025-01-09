import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SystemMapControlsComponent } from '../system-map-controls/system-map-controls.component';
import { SystemMapEditorCircleComponent } from '../system-map-editor-circle/system-map-editor-circle.component';
import { SystemMapStateComponent } from '../system-map-state/system-map-state.component';
import { SystemAMapController } from './controller/system-map-amap.controller';
import { SystemMapController } from './controller/system-map.controller';
import { SystemMapBusiness } from './system-map.business';
import { SystemMapShopArgs, SystemMapShopRadiusArgs } from './system-map.model';
import { SystemMapPanel } from './system-map.panel';

@Component({
  selector: 'ias-system-map',
  imports: [
    CommonModule,
    SystemMapStateComponent,
    SystemMapControlsComponent,
    SystemMapEditorCircleComponent,
  ],
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.less',
  providers: [SystemAMapController, SystemMapController, SystemMapBusiness],
})
export class SystemMapComponent implements OnInit {
  constructor(
    private business: SystemMapBusiness,
    private controller: SystemMapController
  ) {}

  panel = new SystemMapPanel();
  args = new SystemMapShopArgs();

  ngOnInit(): void {
    this.init();
    this.load();
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

  load() {
    this.business.load(this.args).then((x) => {
      this.controller.amap.load(x);
    });
  }

  control = {
    onradius: () => {
      this.panel.state.show = false;
      this.panel.editor.circle.show = true;
      this.controller.amap.radius.open();
    },
  };
  trigger = {
    editor: {
      circle: {
        onok: (data: SystemMapShopRadiusArgs) => {
          this.args.radius = data;
          this.load();
          this.controller.amap.radius.close();
          this.panel.editor.circle.show = false;
          this.panel.state.show = true;
        },
        oncancel: () => {
          this.panel.editor.circle.show = false;
          this.panel.state.show = true;
        },
      },
    },
  };
}
