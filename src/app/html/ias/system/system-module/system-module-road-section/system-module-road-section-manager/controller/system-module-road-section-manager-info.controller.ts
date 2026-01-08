import { EventEmitter, Injectable } from '@angular/core';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';

@Injectable()
export class SystemModuleRoadSectionManagerInfoController {
  create = new EventEmitter<RoadSection>();

  ok = new EventEmitter<RoadSection>();
  cancel = new EventEmitter<void>();

  show = false;
  data = new RoadSection();

  onpath(path: [number, number][]) {
    this.data = new RoadSection();
    this.data.GeoLine = path.map((x) => {
      let point = new GisPoint();
      point.Longitude = x[0];
      point.Latitude = x[1];
      point.Altitude = 0;
      return point;
    });
  }
  onok(data: RoadSection) {
    this.ok.emit(data);
  }
  oncancel() {
    this.cancel.emit();
  }
}
