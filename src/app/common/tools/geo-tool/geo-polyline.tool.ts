import { GeoPolylineClosestTool } from './geo-polyline-closet.tool';
import { GeoLine, GeoPoint, GeoPolyline } from './geo.model';

export class GeoPolylineTool {
  closest = new GeoPolylineClosestTool();

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
}
