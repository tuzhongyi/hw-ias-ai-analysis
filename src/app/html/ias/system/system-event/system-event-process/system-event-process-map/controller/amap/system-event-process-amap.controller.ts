import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemAMapCircleEditorController } from '../../../../../system-map/component/controller/amap/circle/system-map-amap-circle-editor.controller';
import { SystemEventProcessAMapMarkerController } from './marker/system-event-process-amap-marker.controller';

export class SystemEventProcessAMapController {
  event = {
    circel: {
      change: new EventEmitter<number>(),
    },
  };
  map = new PromiseValue<AMap.Map>();
  circle = new PromiseValue<SystemAMapCircleEditorController>();
  marker = new PromiseValue<SystemEventProcessAMapMarkerController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap
      .get(
        'system-event-process-map',
        ['AMap.CircleEditor', 'AMap.Adaptor'],
        true
      )
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);

        this.init.map(x);
        this.init.circle(x);
        this.init.marker(x);
      });
    this.regist();
  }

  private init = {
    map: (map: AMap.Map) => {
      this.map.set(map);
    },
    circle: (map: AMap.Map) => {
      let ctr = new SystemAMapCircleEditorController(map);
      ctr.circle.create();
      this.circle.set(ctr);
    },
    marker: (map: AMap.Map) => {
      let ctr = new SystemEventProcessAMapMarkerController(map);
      this.marker.set(ctr);
    },
  };
  private regist() {
    this.circle.get().then((ctr) => {
      let sub = ctr.event.change.subscribe((x) => {
        this.event.circel.change.emit(x);
      });
      this.subscription.add(sub);
    });
  }
}
