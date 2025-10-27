import { Injectable } from '@angular/core';
import { GisType } from '../../../../../../../common/data-core/enums/gis-type.enum';
import { AnalysisGpsTask } from '../../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { SceneImage } from '../../../../../../../common/data-core/models/arm/analysis/llm/scene-Image.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ConfigRequestService } from '../../../../../../../common/data-core/requests/services/config/config.service';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';

@Injectable()
export class SystemModuleGpsTaskDetailsCreater {
  constructor(
    private manager: Manager,
    private config: ConfigRequestService,
    private local: LocalStorage
  ) {}

  task() {
    let model = new AnalysisGpsTask();

    model.CaptureInterval = 5;
    model.CaptureTimes = 1;
    model.CaptureRadius = 20;
    model.MaxTimeSpan = 15;
    model.SourceType = 1;
    model.TaskType = 202;

    this.gis().then((x) => {
      model.Location = x;
    });

    this.manager.source.analysis.shop.CameraNos.get().then((cameras) => {
      if (cameras.length > 0) {
        let camera = cameras[0];
        let position = parseInt(camera.Value);
        model.CapturePositions = [position];
        model.Images = [this.image(position)];
      } else {
        model.CapturePositions = [];
        model.Images = [];
      }
    });

    return model;
  }

  images() {
    return this.manager.source.analysis.shop.CameraNos.get().then((cameras) => {
      if (cameras.length > 0) {
        let camera = cameras[0];
        return [this.image(parseInt(camera.Value))];
      }
      return [];
    });
  }

  private image(no: number) {
    let image = new SceneImage();
    image.PositionNo = no;
    return image;
  }

  private gis() {
    return this.config.location().then((x) => {
      let location = new GisPoints();
      let gis = new GisPoint();

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
