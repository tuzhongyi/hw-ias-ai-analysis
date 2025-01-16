import { EventEmitter, Injectable } from '@angular/core';
import {
  SystemMapPanel,
  SystemMapShopRadiusArgs,
} from '../../system-map.model';
import { SystemAMapController } from '../amap/system-map-amap.controller';

@Injectable()
export class SystemMapPanelEditorCircleController extends SystemMapPanel {
  load = new EventEmitter<SystemMapShopRadiusArgs>();

  constructor(private amap: SystemAMapController) {
    super();
  }

  ondistance(value: number) {
    this.amap.radius.set(value);
  }

  onok(data: SystemMapShopRadiusArgs) {
    this.load.emit(data);
    this.show = false;
  }
  oncancel() {
    this.show = false;
  }
}
