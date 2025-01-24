import { EventEmitter, Injectable } from '@angular/core';
import {
  SystemMapPanel,
  SystemMapShopDistanceArgs,
} from '../../system-map.model';

@Injectable()
export class SystemMapPanelEditorCircleController extends SystemMapPanel {
  load = new EventEmitter<SystemMapShopDistanceArgs>();
  clear = new EventEmitter<void>();
  distance = new EventEmitter<number>();

  constructor() {
    super();
  }

  ondistance(value: number) {
    this.distance.emit(value);
  }

  onok(data: SystemMapShopDistanceArgs) {
    this.load.emit(data);
  }
  oncancel() {
    this.show = false;
    this.clear.emit();
  }
}
