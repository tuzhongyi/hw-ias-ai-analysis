import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { SystemMainMapAlarmInfoComponent } from '../../../../system-main-map-alarm-info/system-main-map-alarm-info.component';
import {
  SystemMainMapAlarmInfoInput,
  SystemMainMapAlarmInfoOutput,
} from '../../../../system-main-map-alarm-info/system-main-map-alarm-info.model';

export class SystemMainMapAMapEventRealtimeInfoController {
  marker?: AMap.InfoWindow;
  current?: MobileEventRecord;
  event = {
    video: new EventEmitter<MobileEventRecord>(),
    picture: new EventEmitter<MobileEventRecord>(),
    close: new EventEmitter<void>(),
  };

  constructor(private map: AMap.Map, private tool: ComponentTool) {}

  private create(content: HTMLElement, position: [number, number]) {
    let marker = new AMap.InfoWindow({
      anchor: 'bottom-left',
      position: position,
      content: content,
      offset: new AMap.Pixel(0, 78),
    });
    return marker;
  }

  add(data: MobileEventRecord) {
    if (this.current && this.current.Id === data.Id) return;
    this.current = data;
    //let content = this.html.get(data);
    let info: SystemMainMapAlarmInfoInput = {
      data: data,
    };
    let component = this.tool.createComponent(
      SystemMainMapAlarmInfoComponent,
      info
    );
    let html = this.tool.getHTML(component);

    this.regist(component.instance as unknown as SystemMainMapAlarmInfoOutput);
    let position: [number, number] = [0, 0];
    if (data.Location) {
      position = [data.Location.GCJ02.Longitude, data.Location.GCJ02.Latitude];
    }
    if (this.marker) {
      this.marker.setContent(html);
      this.marker.setPosition(position);
    } else {
      this.marker = this.create(html, position);
    }
    this.map.add(this.marker);
    this.marker.open(this.map, position);
    // this.regist(this.marker);
  }

  regist(info: SystemMainMapAlarmInfoOutput) {
    info.close.subscribe((x) => {
      this.event.close.emit();
      this.remove();
    });
    info.video.subscribe((x) => {
      this.event.video.emit(x);
    });
    info.image.subscribe((x) => {
      this.event.picture.emit(x);
    });
  }

  remove() {
    if (this.marker) {
      this.map.remove(this.marker);
      this.marker = undefined;
      this.current = undefined;
    }
  }
}
