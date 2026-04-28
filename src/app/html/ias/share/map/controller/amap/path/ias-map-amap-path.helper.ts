import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { GeoLine } from '../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { IIASMapCurrent } from '../../../ias-map.model';
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
      closest?: (closest: FileGpsItem) => Promise<void>;
      current?: (current: IIASMapCurrent) => Promise<void>;
    },
    displayroute = true
  ) {
    if (datas.length == 0) return;
    return new Promise<void>((resolve) => {
      let times = datas.map((x) => {
        return x.OffsetTime.toSeconds();
      });

      let closest = ArrayTool.closest.between(times, stamp);
      if (closest) {
        let start = datas[closest.left.index];
        let end = datas[closest.right.index];

        if (callback?.closest) {
          callback.closest(start);
        }
        let line: GeoLine = [
          [start.Longitude, start.Latitude],
          [end.Longitude, end.Latitude],
        ];

        let position = GeoTool.line.get.by.percent(line, closest.percent);
        if (callback?.current) {
          callback.current({
            position: position,
            timestamp: stamp,
          });
        }
        if (displayroute) {
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
            x.clear();
            x.load(way);
          });
        } else {
          controller.way.then((x) => {
            x.clear();
          });
        }

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

  static color = {
    from: {
      road: {
        object: {
          state: (value?: RoadObjectState) => {
            switch (value) {
              case RoadObjectState.Normal:
                return ColorTool.map.cyan;
              case RoadObjectState.Disappear:
                return ColorTool.map.red;
              case RoadObjectState.Breakage:
                return ColorTool.map.orange;
              case RoadObjectState.None:
                return ColorTool.map.green;
              default:
                return ColorTool.map.gray;
            }
          },
        },
      },
    },
  };
}
