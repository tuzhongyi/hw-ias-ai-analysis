import { EventEmitter, Injectable } from '@angular/core';
import {
  SystemMapPanel,
  SystemMapShopDistanceArgs,
} from '../../system-map.model';

@Injectable()
export class SystemMapPanelEditorCircleGettingController extends SystemMapPanel {
  distance = new EventEmitter<number>();

  constructor() {
    super();
  }

  ondistance(value: number) {
    this.distance.emit(value);
  }

  onok(data: SystemMapShopDistanceArgs) {
    this.show = false;
  }
  oncancel() {
    this.show = false;
  }
}
