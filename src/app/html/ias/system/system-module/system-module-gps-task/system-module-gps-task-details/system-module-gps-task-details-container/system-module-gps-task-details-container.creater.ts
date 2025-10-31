import { Injectable } from '@angular/core';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { AnalysisGpsTask } from '../../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { SceneImage } from '../../../../../../../common/data-core/models/arm/analysis/llm/scene-Image.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { ConfigRequestService } from '../../../../../../../common/data-core/requests/services/config/config.service';

@Injectable()
export class SystemModuleGpsTaskDetailsCreater {
  constructor(private config: ConfigRequestService) {}

  task() {
    let model = new AnalysisGpsTask();

    model.CaptureInterval = 5;
    model.CaptureTimes = 1;
    model.CaptureRadius = 20;
    model.MaxTimeSpan = 6;
    model.SourceType = 1;
    model.TaskType = 202;

    this.gis().then((x) => {
      model.Location = x;
    });

    model.Images = [this.image()];

    return model;
  }

  private image() {
    let image = new SceneImage();
    return image;
  }

  private gis() {
    return this.config.location().then((x) => {
      let location = new GisPoints();
      let gis = new GisPoint();
      gis.Altitude = 0;
      if (x) {
        gis.Longitude = x[0];
        gis.Latitude = x[1];
        gis.GisType = GisType.GCJ02;
      } else {
        gis.Longitude = 121.472644;
        gis.Latitude = 31.231706;
        gis.GisType = GisType.WGS84;
      }

      location.set(gis, gis.GisType);
      return location;
    });
  }
}
