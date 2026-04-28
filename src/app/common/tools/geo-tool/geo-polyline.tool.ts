import { GeoPolylineClosestTool } from './geo-polyline-closet.tool';
import { GeoPolylineConvertTool } from './geo-polyline-convert.tool';
import { GeoLine, GeoPoint, GeoPolyline } from './geo.model';
import { GeoTool } from './geo.tool';

export class GeoPolylineTool {
  closest = new GeoPolylineClosestTool();
  convert = new GeoPolylineConvertTool();

  center(points: GeoPolyline): GeoPoint | undefined {
    let total = 0,
      lens = [];
    for (let i = 1; i < points.length; i++) {
      let len = Math.sqrt(
        Math.pow(points[i][0] - points[i - 1][0], 2) +
          Math.pow(points[i][1] - points[i - 1][1], 2)
      );
      lens.push(len);
      total += len;
    }
    let half = total / 2;
    for (let i = 1; i < points.length; i++) {
      if (half > lens[i - 1]) {
        half -= lens[i - 1];
      } else {
        let t = half / lens[i - 1],
          x = points[i - 1][0] + (points[i][0] - points[i - 1][0]) * t,
          y = points[i - 1][1] + (points[i][1] - points[i - 1][1]) * t;
        return [x, y];
      }
    }
    return undefined;
  }
  split(points: GeoPolyline): GeoLine[] {
    let lines: GeoLine[] = [];
    for (let i = 1; i < points.length; i++) {
      lines.push([points[i - 1], points[i]]);
    }
    return lines;
  }
  /**
   * 角度转弧度（内部工具方法）
   * @param {number} deg - 角度
   * @returns {number} 弧度
   */
  toRadians(deg: number) {
    return (deg * Math.PI) / 180;
  }

  /**
   * 沿着线段前进指定距离，计算新坐标
   * @param {[number, number]} start - 起点 [lng, lat]
   * @param {[number, number]} end - 终点 [lng, lat]
   * @param {number} moveDist - 要移动的距离（米）
   * @returns {[number, number]} 新坐标
   */
  moveAlongSegment(start: GeoPoint, end: GeoPoint, moveDist: number) {
    const segmentDist = GeoTool.point.distance(start, end);
    const ratio = moveDist / segmentDist;

    const newLng = start[0] + (end[0] - start[0]) * ratio;
    const newLat = start[1] + (end[1] - start[1]) * ratio;

    return [newLng, newLat] as [number, number];
  }

  /**
   * 经纬度线段等距采样（主方法）
   * @param {Array<[number, number]>} line - 经纬度线段数组
   * @param {number} distance - 采样间隔（米）
   * @returns {Array<[number, number]>} 等距点数组
   */
  sampleLineByDistance(line: GeoPolyline, distance: number) {
    if (!line || line.length < 2 || distance <= 0) {
      return [...line];
    }

    const result = [line[0]];
    let currentPoint: GeoPoint = [...line[0]];
    let pointIndex = 1;
    let remainingDistance = distance;

    while (pointIndex < line.length) {
      const nextPoint = line[pointIndex];
      const distToNext = GeoTool.point.distance(currentPoint, nextPoint);

      if (distToNext <= remainingDistance) {
        remainingDistance -= distToNext;
        currentPoint = [...nextPoint];
        pointIndex++;
      } else {
        currentPoint = this.moveAlongSegment(
          currentPoint,
          nextPoint,
          remainingDistance
        );
        result.push([...currentPoint]);
        remainingDistance = distance;
      }
    }

    // 确保加入终点
    const last = result[result.length - 1];
    const end = line[line.length - 1];
    if (GeoTool.point.distance(last, end) > 0) {
      result.push([...end]);
    }

    return result;
  }
}
