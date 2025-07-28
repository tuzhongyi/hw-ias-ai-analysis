import { GeoPointConvertTool } from './geo-point-convert.tool';
import { GeoPointSortTool } from './geo-point-sort.tool';
import { GeoPoint } from './geo.model';

export class GeoPointTool {
  sort = new GeoPointSortTool();
  convert = new GeoPointConvertTool();

  offset = {
    longitude: -0.000016186056,
    latitude: -0.00001413124316,
  };

  /** 角度 */
  private radians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  /** 弧度 */
  private degrees(radians: number): number {
    return radians * (180 / Math.PI);
  }
  /** 方向 */
  direction(point1: GeoPoint, point2: GeoPoint): number {
    const φ1 = this.radians(point1[1]);
    const φ2 = this.radians(point2[1]);
    const Δλ = this.radians(point2[0] - point1[0]);

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    let θ = Math.atan2(y, x);

    θ = this.degrees(θ);
    return (θ + 360) % 360; // 确保结果在 0 到 360 度之间
  }
  /** 距离 */
  private math_distance(point1: GeoPoint, point2: GeoPoint): number {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  distance(point1: GeoPoint, point2: GeoPoint) {
    var rad1 = (point1[1] * Math.PI) / 180.0;
    var rad2 = (point2[1] * Math.PI) / 180.0;
    var a = rad1 - rad2;
    var b = (point1[0] * Math.PI) / 180.0 - (point2[0] * Math.PI) / 180.0;
    var r = 6378137; // 地球半径，单位为米
    var distance =
      r *
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)
        )
      );
    return distance;
  }

  /** 最近点 */
  closest(points: GeoPoint[], target: GeoPoint): GeoPoint | null {
    if (points.length === 0) return null;

    let closestPoint = points[0];
    let minDistance = this.math_distance(points[0], target);

    for (let i = 1; i < points.length; i++) {
      const distance = this.math_distance(points[i], target);
      if (distance < minDistance) {
        closestPoint = points[i];
        minDistance = distance;
      }
    }

    return closestPoint;
  }

  // sort(
  //   points: GeoPoint[],
  //   sort: {
  //     lon: GeoLongitudeDirection;
  //     lat: GeoLatitudeDirection;
  //   }
  // ) {
  //   return points.sort((a, b) => this.sortcompare(a, b, sort));
  // }
  // sortcompare(a: GeoPoint, b: GeoPoint, sort = new GeoDirectionSort()) {
  //   // 先按东西方向排序
  //   let longitudeCompare = 0;
  //   if (sort.lon === GeoLongitudeDirection.west2east) {
  //     longitudeCompare = a[0] - b[0];
  //   } else if (sort.lon === GeoLongitudeDirection.east2west) {
  //     longitudeCompare = b[0] - a[0];
  //   }

  //   // 如果经度相同，再根据南北方向排序
  //   if (longitudeCompare === 0) {
  //     let latitudeCompare = 0;
  //     if (sort.lat === GeoLatitudeDirection.south2north) {
  //       latitudeCompare = b[1] - a[1];
  //     } else if (sort.lat === GeoLatitudeDirection.north2south) {
  //       latitudeCompare = a[1] - b[1];
  //     }
  //     return latitudeCompare;
  //   }

  //   return longitudeCompare;
  // }

  // sortCoordinates(
  //   points: GeoPoint[],
  //   ew: GeoLongitudeDirection,
  //   ns: GeoLatitudeDirection,
  //   weightEW = 1,
  //   weightNS = 1
  // ) {
  //   // 将原始经纬度转换为在指定方向下的“坐标”
  //   let transform = (point: GeoPoint) => {
  //     // 经度转换：east时正向排序，west时取反
  //     const x = ew === GeoLongitudeDirection.west2east ? point[0] : -point[0];
  //     // 纬度转换：north时取反（因为北边的纬度大，通常希望排序在前），south时正向
  //     // 注意：这里的处理方式可根据你的实际需求调整
  //     const y = ns === GeoLatitudeDirection.south2north ? -point[1] : point[1];
  //     return { x, y };
  //   };

  //   // 计算综合得分，采用加权欧氏距离
  //   // 得分越低表示在综合方向上“更靠前”
  //   let compositeScore = (point: GeoPoint) => {
  //     const { x, y } = transform(point);
  //     return Math.sqrt((weightEW * x) ** 2 + (weightNS * y) ** 2);
  //   };

  //   // 复制一份数组，避免改变原数组
  //   const pointsCopy = [...points];

  //   // 根据综合得分排序
  //   pointsCopy.sort((a, b) => compositeScore(a) - compositeScore(b));
  //   return pointsCopy;
  // }
}
