import { GeoPoint } from '../geo-tool/geo.model';

export class MathTool {
  static distance(a: GeoPoint, b: GeoPoint) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return dx * dx + dy * dy;
  }
}
