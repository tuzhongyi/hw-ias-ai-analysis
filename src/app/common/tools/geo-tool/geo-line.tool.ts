import { GeoLine, GeoPoint } from './geo.model';

export class GeoLineTool {
  on(line: GeoLine, point: GeoPoint, epsilon: number = 1e-10): boolean {
    // 处理线段端点重合的情况
    if (
      Math.hypot(line[1][0] - line[0][0], line[1][1] - line[0][1]) < epsilon
    ) {
      return Math.hypot(point[0] - line[0][0], point[1] - line[0][1]) < epsilon;
    }

    const abx = line[1][0] - line[0][0];
    const aby = line[1][1] - line[0][1];
    const apx = point[0] - line[0][0];
    const apy = point[1] - line[0][1];

    // 计算投影参数 t
    const t = (apx * abx + apy * aby) / (abx * abx + aby * aby);

    // 将 t 限制在 [0, 1] 范围内
    const clampedT = Math.max(0, Math.min(1, t));

    // 计算投影点坐标
    const projX = line[0][0] + clampedT * abx;
    const projY = line[0][1] + clampedT * aby;

    // 计算距离平方
    const dx = point[0] - projX;
    const dy = point[1] - projY;
    const distanceSquared = dx * dx + dy * dy;

    return distanceSquared <= epsilon * epsilon;
  }

  per(line: GeoLine, point: GeoPoint): GeoPoint {
    const [[x1, y1], [x2, y2]] = line;
    const [px, py] = point;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const lenSq = dx * dx + dy * dy;

    // 退化线段（两个点重合）
    if (lenSq === 0) {
      return [x1, y1];
    }

    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;

    // 限制在线段范围内
    t = Math.max(0, Math.min(1, t));

    const cx = x1 + t * dx;
    const cy = y1 + t * dy;

    return [cx, cy];
  }
}
