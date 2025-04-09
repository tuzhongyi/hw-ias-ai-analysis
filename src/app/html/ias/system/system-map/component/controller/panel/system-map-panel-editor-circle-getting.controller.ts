import { EventEmitter, Injectable } from '@angular/core';
import { SystemMapDistanceArgs, SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelEditorCircleGettingController extends SystemMapPanel {
  distance = new EventEmitter<number>();

  constructor() {
    super();
  }

  ondistance(value: number) {
    this.distance.emit(value);
  }

  onok(data: SystemMapDistanceArgs) {
    this.show = false;
  }
  oncancel() {
    this.show = false;
  }
}
