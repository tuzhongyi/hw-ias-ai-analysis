import { EventEmitter, Injectable } from '@angular/core';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelTaskController extends SystemMapPanel {
  compare = new EventEmitter<string[]>();
  selecteds: string[] = [];
  name?: string;
  load = new EventEmitter<string>();

  constructor() {
    super();
  }

  oncompare() {
    this.compare.emit(this.selecteds);
  }

  onclose() {
    this.selecteds = [];
    this.show = false;
  }
}
