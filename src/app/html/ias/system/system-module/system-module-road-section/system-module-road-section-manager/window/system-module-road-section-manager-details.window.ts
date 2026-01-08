import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleRoadSectionManagerDetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '工作表';

  create = new EventEmitter<RoadSection>();

  ok = new EventEmitter<RoadSection>();
  cancel = new EventEmitter<void>();

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
