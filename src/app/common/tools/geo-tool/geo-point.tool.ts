import { GeoPoint } from './geo.model';

export class GeoPointTool {
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
  distance(point1: GeoPoint, point2: GeoPoint): number {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  /** 最近点 */
  closest(points: GeoPoint[], target: GeoPoint): GeoPoint | null {
    if (points.length === 0) return null;

    let closestPoint = points[0];
    let minDistance = this.distance(points[0], target);

    for (let i = 1; i < points.length; i++) {
      const distance = this.distance(points[i], target);
      if (distance < minDistance) {
        closestPoint = points[i];
        minDistance = distance;
      }
    }

    return closestPoint;
  }
}
