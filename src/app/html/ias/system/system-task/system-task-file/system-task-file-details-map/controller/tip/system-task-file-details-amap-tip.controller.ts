import { EventEmitter } from '@angular/core';
import { AMapInputTipItem } from '../../../../../../../../common/helper/map/amap.model';
import { SystemTaskFileDetailsAMapTipIconController } from './system-task-file-details-amap-tip-icon.controller';

export class SystemTaskFileDetailsAMapTipEvent {
  mouseover = new EventEmitter<AMapInputTipItem>();
  mouseout = new EventEmitter<AMapInputTipItem>();
  click = new EventEmitter<AMapInputTipItem>();
}

export class SystemTaskFileDetailsAMapSearchPointController {
  event = new SystemTaskFileDetailsAMapTipEvent();
  marker: AMap.LabelMarker;
  selected = false;
  data: AMapInputTipItem;

  constructor(data: AMapInputTipItem) {
    this.marker = this.create(data);
    this.data = data;
  }

  protected icon = new SystemTaskFileDetailsAMapTipIconController();

  private create(data: AMapInputTipItem) {
    if (data.location) {
      let marker = new AMap.LabelMarker({
        icon: this.icon.normal,
        position: [...data.location],
        title: data.name,
      });
      this.regist(marker);
      return marker;
    }
    throw new Error('Location is not defined');
  }

  private regist(marker: AMap.LabelMarker) {
    marker.on('mouseover', (e: any) => {
      this.hover();
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
      this.out();
      this.event.mouseout.emit(this.data);
    });
    marker.on('click', (e: any) => {
      this.event.click.emit(this.data);
    });
  }

  hover() {
    if (this.selected) return;
    this.marker.setzIndex(2);
  }
  out() {
    if (this.selected) return;
    this.marker.setzIndex(1);
  }
  select() {
    if (this.selected) return;
    this.selected = true;
    this.marker.setIcon(this.icon.selected);
    this.marker.setzIndex(3);
  }
  blur() {
    if (!this.selected) return;
    this.selected = false;
    this.marker.setIcon(this.icon.normal);
    this.marker.setzIndex(1);
  }
}
