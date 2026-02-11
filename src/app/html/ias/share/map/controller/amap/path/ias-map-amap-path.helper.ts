import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import { GeoLine } from '../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { IASMapAMapPathArrowController } from './ias-map-amap-path-arrow.controller';
import { IASMapAMapPathWayController } from './ias-map-amap-path-way.controller';

export class IASMapAMapPathHelper {
  static async to(
    datas: FileGpsItem[],
    stamp: number,
    controller: {
      way: Promise<IASMapAMapPathWayController>;
      arrow: Promise<IASMapAMapPathArrowController>;
    },
    callback?: {
      course?: (course: number) => Promise<void>;
      current?: (current: FileGpsItem) => Promise<void>;
    }
  ) {
    return new Promise<void>((resolve) => {
      let times = datas.map((x) => {
        let time = x.OffsetTime.toDate();
        return time.getTime();
      });

      let closest = ArrayTool.closest.between(times, stamp);
      if (closest) {
        let start = datas[closest.left.index];
        let end = datas[closest.right.index];
        if (callback?.current) {
          callback.current(start);
        }
        let line: GeoLine = [
          [start.Longitude, start.Latitude],
          [end.Longitude, end.Latitude],
        ];
        let position = GeoTool.line.get.by.percent(line, closest.percent);
        let way = datas
          .slice(0, closest.right.index)
          .map<[number, number]>((x) => {
            return [x.Longitude, x.Latitude];
          });
        if (closest.percent == 1) {
          way.push(line[0]);
          way.push(line[1]);
        } else {
          way.push(position);
        }

        controller.way.then((x) => {
          x.load(way, line);
        });

        controller.arrow.then((x) => {
          x.set(position);
          let course = 0;
          if (Number.isFinite(end.Course)) {
            course = x.direction(end.Course!);
          } else {
            course = x.direction1(line);
          }
          if (callback?.course) {
            callback.course(course);
          }
        });
      }
    });
  }
}
