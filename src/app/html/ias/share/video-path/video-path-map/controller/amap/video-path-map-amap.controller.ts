import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../common/tools/geo-tool/geo.model';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IASMapAMapPathArrowController } from '../../../../map/controller/amap/path/ias-map-amap-path-arrow.controller';
import { IASMapAMapPathLabelController } from '../../../../map/controller/amap/path/ias-map-amap-path-label.controller';
import { IASMapAMapPathWayController } from '../../../../map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../map/controller/amap/path/ias-map-amap-path.controller';
import { VideoPathMapAMapPointController } from './point/video-path-map-amap-point.controller';

@Injectable()
export class VideoPathMapAMapController {
  arrow = new PromiseValue<IASMapAMapPathArrowController>();
  way = new PromiseValue<IASMapAMapPathWayController>();
  label = new PromiseValue<IASMapAMapPathLabelController>();
  point = new PromiseValue<VideoPathMapAMapPointController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap.get('video-path-map-container').then((x) => {
      this.map.set(x);
      this.arrow.set(new IASMapAMapPathArrowController(x));
      this.way.set(new IASMapAMapPathWayController(x));
      this.label.set(new IASMapAMapPathLabelController(x));
      this.point.set(new VideoPathMapAMapPointController(x));
    });
  }

  private map = new PromiseValue<AMap.Map>();

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }

  fit = {
    view: (immediately?: boolean) => {
      this.map.get().then((x) => {
        x.setFitView(undefined, immediately);
      });
    },
  };

  private _path: IASMapAMapPathController[] = [];
  path = {
    mouseover: new EventEmitter<{
      line: GeoLine;
      point: GeoPoint;
      percent: number;
    }>(),
    mouseout: new EventEmitter<void>(),
    click: new EventEmitter<{
      line: GeoLine;
      point: GeoPoint;
      percent: number;
    }>(),
    load: async (datas: FileGpsItem[][], focus: boolean) => {
      let map = await this.map.get();

      let polylines = datas
        .map((items, i) => {
          let positions = items.map(
            (x) => [x.Longitude, x.Latitude] as [number, number]
          );
          let type = items.every((x) => !!x.HighPrecision) ? 1 : 0;
          let path = new IASMapAMapPathController(map, type);
          let sub1 = path.mouseover.subscribe((x) => {
            this.path.mouseover.emit(x);
          });
          this.subscription.add(sub1);
          let sub2 = path.mouseout.subscribe((x) => {
            this.path.mouseout.emit(x);
          });
          this.subscription.add(sub2);
          let sub3 = path.click.subscribe((x) => {
            this.path.click.emit(x);
          });
          this.subscription.add(sub3);

          this._path.push(path);
          return path.load(positions, false)!;
        })
        .filter((x) => !!x);

      if (focus) {
        map.setFitView(polylines, true);
        setTimeout(() => {
          map.setFitView(polylines, true);
        }, 2 * 1000);
      }
    },
    clear: () => {
      this._path.forEach((x) => {
        x.clear();
      });
      this._path = [];
    },
  };
}
