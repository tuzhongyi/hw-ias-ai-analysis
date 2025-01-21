import { EventEmitter, Injectable } from '@angular/core';
import {
  SystemMapPanel,
  SystemMapShopRadiusArgs,
} from '../../system-map.model';
import { SystemMapAMapController } from '../amap/system-map-amap.controller';

@Injectable()
export class SystemMapPanelEditorCircleController extends SystemMapPanel {
  load = new EventEmitter<SystemMapShopRadiusArgs>();
  clear = new EventEmitter<void>();

  constructor(private amap: SystemMapAMapController) {
    super();
  }

  ondistance(value: number) {
    this.amap.radius.set(value);
  }

  onok(data: SystemMapShopRadiusArgs) {
    this.load.emit(data);
  }
  oncancel() {
    this.show = false;
    this.clear.emit();
  }
}
