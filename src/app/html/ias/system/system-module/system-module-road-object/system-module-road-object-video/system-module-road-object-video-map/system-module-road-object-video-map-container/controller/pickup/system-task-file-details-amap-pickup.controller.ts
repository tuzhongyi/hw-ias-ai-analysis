import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { PathTool } from '../../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapIconController } from '../../../../../../../../share/map/controller/amap/shop/marker/ias-map-amap-shop-icon.controller';
import { SystemTaskFileDetailsAMapPickupMarkerController } from './system-task-file-details-amap-pickup-marker.controller';

export class SystemTaskFileDetailsAMapPickupController {
  event = {
    dragend: new EventEmitter<[number, number]>(),
  };

  constructor(private map: AMap.Map, subscription: Subscription) {
    this.regist(subscription);
  }

  icon = new IASMapAMapIconController();
  marker = new SystemTaskFileDetailsAMapPickupMarkerController();

  create(position: [number, number]) {
    let args = {
      path: PathTool.image.map.object.unknow.green,
      size: [SizeTool.map.object.width, SizeTool.map.object.height] as [
        number,
        number
      ],
    };
    let marker = this.marker.set(position, args, true);
    this.map.add(marker);
  }

  async remove() {
    let marker = await this.marker.get();
    if (marker) {
      this.map.remove(marker);
    }
  }

  private regist(subscription: Subscription) {
    let sub = this.marker.event.dragend.subscribe((x) => {
      this.event.dragend.emit(x);
    });
    subscription.add(sub);
  }
}
