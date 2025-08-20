import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ObjectTool } from '../../../../../../../../../common/tools/object-tool/object.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';
import { SystemEventMapContainerAMapMarkerIconController } from './system-event-map-container-amap-marker-icon.controller';

export class SystemEventMapContainerAMapMarkerController {
  event = {
    mouseover: new EventEmitter<MobileEventRecord>(),
    mouseout: new EventEmitter<MobileEventRecord>(),
    click: new EventEmitter<MobileEventRecord>(),
  };
  marker: AMap.LabelMarker;
  selected = false;
  data: MobileEventRecord;

  constructor(data: MobileEventRecord) {
    this.marker = this.create(data);
    this.data = data;
  }
  protected icon = new SystemEventMapContainerAMapMarkerIconController();

  private create(data: MobileEventRecord) {
    if (data.Location) {
      let position: [number, number] = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
      console.log('size:', this.icon.size);
      console.log('offset:', this.icon.offset);
      let marker = new AMap.LabelMarker({
        icon: this.icon.get(data),
        position: [...position],
        title:
          data.AudioContent ??
          ObjectTool.model.MobileEventRecord.get.name(data),
        zooms: IASMapAMapConfig.icon.zooms,
      });
      this.regist(marker);
      return marker;
    }
    throw new Error('Location is not defined');
  }

  private regist(marker: AMap.LabelMarker) {
    marker.on('mouseover', (e: any) => {
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
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
    this.marker.setzIndex(3);
  }
  blur() {
    if (!this.selected) return;
    this.selected = false;
    this.marker.setzIndex(1);
  }
  move(position: [number, number]) {
    this.marker.setPosition(position);
  }
}
