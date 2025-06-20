import { EventEmitter, Injectable } from '@angular/core';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';

@Injectable()
export class SystemModuleRoadManagerInfoController {
  create = new EventEmitter<Road>();

  ok = new EventEmitter<Road>();
  cancel = new EventEmitter<void>();

  show = false;
  data = new Road();

  onpath(path: [number, number][]) {
    this.data = new Road();
    this.data.GeoLine = path.map((x) => {
      let point = new GisPoint();
      point.Longitude = x[0];
      point.Latitude = x[1];
      point.Altitude = 0;
      return point;
    });
  }
  onok(data: Road) {
    this.ok.emit(data);
  }
  oncancel() {
    this.cancel.emit();
  }
}
