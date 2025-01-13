import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemAMapPointIconController } from './system-map-amap-point-icon.controller';

import { EventEmitter } from '@angular/core';

export class SystemAMapPointController {
  mouseover = new EventEmitter<Shop>();
  mouseout = new EventEmitter<Shop>();

  private icon = new SystemAMapPointIconController();

  create(data: Shop) {
    if (data.Location) {
      let position = [data.Location.Longitude, data.Location.Latitude];
      let icon = this.icon.create();
      const marker = new AMap.LabelMarker({
        icon: icon,
        position: [...position],
        title: data.Name,
        name: data.Id,
        extData: data,
      });
      this.regist(marker);
      return marker;
    }
    return undefined;
  }

  private regist(marker: AMap.LabelMarker) {
    marker.on('mouseover', (e: any) => {
      let data = e.target.getExtData();
      this.mouseover.emit(data);
    });
    marker.on('mouseout', (e: any) => {
      let data = e.target.getExtData();
      this.mouseout.emit(data);
    });
  }
}
