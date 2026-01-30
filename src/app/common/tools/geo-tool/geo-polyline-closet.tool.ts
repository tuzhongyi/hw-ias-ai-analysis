import { GeoLine, GeoPoint, GeoPolyline } from './geo.model';

export class GeoPolylineClosestTool {
  private closestPointOnLine(
    line: GeoLine,
    point: GeoPoint
  ): ClosestPointOnLineResult {
    const [[x1, y1], [x2, y2]] = line;
    const [px, py] = point;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const lenSq = dx * dx + dy * dy;

    // 退化线段（两个点重合）
    if (lenSq === 0) {
      const dpx = px - x1;
      const dpy = py - y1;
      return {
        point: [x1, y1],
        t: 0,
        distanceSq: dpx * dpx + dpy * dpy,
      };
    }

    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;

    // 限制在线段范围内
    t = Math.max(0, Math.min(1, t));

    const cx = x1 + t * dx;
    const cy = y1 + t * dy;

    const distX = px - cx;
    const distY = py - cy;

    return {
      point: [cx, cy],
      t,
      distanceSq: distX * distX + distY * distY,
    };
  }

  get(
    polyline: GeoPolyline,
    point: GeoPoint
  ): ClosestPointOnPolylineResult | undefined {
    if (polyline.length < 2) return undefined;

    // ① 预计算每段长度 & 总长度
    const segmentLengths: number[] = [];
    let totalLength = 0;

    for (let i = 0; i < polyline.length - 1; i++) {
      const dx = polyline[i + 1][0] - polyline[i][0];
      const dy = polyline[i + 1][1] - polyline[i][1];
      const len = Math.sqrt(dx * dx + dy * dy);
      segmentLengths.push(len);
      totalLength += len;
    }

    let minDistSq = Infinity;
    let result: ClosestPointOnPolylineResult | undefined = undefined;

    for (let i = 0; i < polyline.length - 1; i++) {
      const line: GeoLine = [polyline[i], polyline[i + 1]];
      const res = this.closestPointOnLine(line, point);

      if (res.distanceSq < minDistSq) {
        minDistSq = res.distanceSq;

        // ② 计算到垂足的累计长度
        let lengthToFoot = 0;
        for (let j = 0; j < i; j++) {
          lengthToFoot += segmentLengths[j];
        }
        lengthToFoot += segmentLengths[i] * res.t;

        const globalPercent =
          totalLength === 0 ? 0 : lengthToFoot / totalLength;

        result = {
          segmentIndex: i,
          line,
          foot: res.point,
          t: res.t,
          percent: {
            segment: res.t,
            global: globalPercent,
          },
          distance: Math.sqrt(res.distanceSq),
        };
      }
    }

    return result;
  }
}

interface ClosestPointOnLineResult {
  /** 最近点（垂足或端点） */
  point: GeoPoint;
  /** 垂足参数：0~1 在线段内 */
  t: number;
  /** 点到线段的平方距离 */
  distanceSq: number;
}
interface ClosestPointOnPolylineResult {
  /** 最近线段索引：polyline[i] -> polyline[i+1] */
  segmentIndex: number;
  /** 最近线段 */
  line: GeoLine;
  /** 垂足（或端点） */
  foot: GeoPoint;
  /** 垂足参数 0~1 */
  t: number;
  /** 在线段中的位置百分比（0~100） */
  percent: {
    global: number;
    segment: number;
  };
  /** 最短距离 */
  distance: number;
}
