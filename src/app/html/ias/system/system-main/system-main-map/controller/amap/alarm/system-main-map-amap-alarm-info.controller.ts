import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Paged } from '../../../../../../../../common/data-core/models/page-list.model';
import { ComponentTool } from '../../../../../../../../common/tools/component-tool/component.tool';
import { SystemMainMapAlarmInfoComponent } from '../../../../system-main-map-alarm-info/system-main-map-alarm-info.component';
import { SystemMainMapAlarmInfoOutput } from '../../../../system-main-map-alarm-info/system-main-map-alarm-info.model';

export class SystemMainMapAMapAlarmInfoController {
  marker?: AMap.InfoWindow;
  current?: MobileEventRecord;
  event = {
    video: new EventEmitter<MobileEventRecord>(),
    picture: new EventEmitter<Paged<MobileEventRecord>>(),
    close: new EventEmitter<void>(),
  };

  constructor(
    private map: AMap.Map,
    private tool: ComponentTool,
    private subscription: Subscription
  ) {}

  private create(content: HTMLElement) {
    let marker = new AMap.InfoWindow({
      anchor: 'bottom-left',
      content: content,
      offset: new AMap.Pixel(0, 78),
    });
    return marker;
  }

  add(data: MobileEventRecord) {
    if (this.current && this.current.Id === data.Id) return;
    this.current = data;
    let position: [number, number] = [0, 0];
    if (data.Location) {
      position = [data.Location.GCJ02.Longitude, data.Location.GCJ02.Latitude];
      setTimeout(() => {
        this.map.setCenter(position);
      });
    }

    let component = this.tool.create(SystemMainMapAlarmInfoComponent, {
      data: data,
      color: data.IsTimeout ? 'red' : 'orange',
    });
    this.regist(
      component.instance as unknown as SystemMainMapAlarmInfoOutput<MobileEventRecord>,
      this.subscription
    );
    let html = this.tool.get.html(component);

    if (this.marker) {
      this.marker.setContent(html);
    } else {
      this.marker = this.create(html);
    }
    // this.map.add(this.marker);
    this.marker.open(this.map, position);

    setTimeout(() => {
      this.marker?.setAnchor('bottom-left');
    }, 1);
  }

  private regist(
    info: SystemMainMapAlarmInfoOutput<MobileEventRecord>,
    subscription: Subscription
  ) {
    let sub1 = info.close.subscribe((x) => {
      this.event.close.emit();
      this.remove();
    });
    subscription.add(sub1);
    let sub2 = info.video.subscribe((x) => {
      this.event.video.emit(x);
    });
    subscription.add(sub2);
    let sub3 = info.image.subscribe((x) => {
      this.event.picture.emit(x);
    });
    subscription.add(sub3);
  }

  remove() {
    if (this.marker) {
      this.map.remove(this.marker);
      this.marker = undefined;
      this.current = undefined;
    }
  }
}
