import { RoadObjectEventType } from '../../../data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectType } from '../../../data-core/enums/road/road-object/road-object-type.enum';
import { FileGpsItem } from '../../../data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../data-core/models/arm/geographic/road-object-event-record.model';
import { ColorTool } from '../../color/color.tool';
import { GeoLine, GeoPoint } from '../../geo-tool/geo.model';
import { GeoTool } from '../../geo-tool/geo.tool';
import { MathTool } from '../../math-tool/math.tool';
import { PathTool } from '../../path-tool/path.tool';

export class RoadObjectEventRecordTool {
  findMatchWithFoot(
    list: FileGpsItem[],
    target: RoadObjectEventRecord,
    timeWindow = 5000
  ): Result | undefined {
    if (list.length < 2) return;

    const targetTime = target.EventTime.getTime();
    const gcj02 = target.Location?.GCJ02;
    const targetPosition = [gcj02?.Longitude, gcj02?.Latitude] as [
      number,
      number
    ];

    // 1️⃣ 找时间最近点
    let closestIndex = 0;
    let minTimeDiff = Infinity;

    for (let i = 0; i < list.length; i++) {
      const diff = Math.abs(list[i].OSDTime!.getTime() - targetTime);
      if (diff < minTimeDiff) {
        minTimeDiff = diff;
        closestIndex = i;
      }
    }

    // 2️⃣ 时间窗口候选（避免回头路）
    const candidates: { point: FileGpsItem; index: number }[] = [];

    for (let i = closestIndex; i >= 0; i--) {
      const diff = Math.abs(list[i].OSDTime!.getTime() - targetTime);
      if (diff <= timeWindow) {
        candidates.push({ point: list[i], index: i });
      } else break;
    }

    for (let i = closestIndex + 1; i < list.length; i++) {
      const diff = Math.abs(list[i].OSDTime!.getTime() - targetTime);
      if (diff <= timeWindow) {
        candidates.push({ point: list[i], index: i });
      } else break;
    }

    // 3️⃣ 最近点（空间）
    let nearest = candidates[0];
    let minDist = Infinity;

    for (const item of candidates) {
      const dist = MathTool.distance(
        [item.point.Longitude, item.point.Latitude],
        targetPosition
      );
      if (dist < minDist) {
        minDist = dist;
        nearest = item;
      }
    }

    const idx = nearest.index;

    // 4️⃣ 构建候选线段（只取邻接）
    const segments: { start: number; end: number }[] = [];

    if (idx > 0) segments.push({ start: idx - 1, end: idx });
    if (idx < list.length - 1) segments.push({ start: idx, end: idx + 1 });

    // 5️⃣ 计算垂足
    let bestFoot: Result['footPoint'] = null;
    let minFootDist = Infinity;

    for (const seg of segments) {
      const A = [list[seg.start].Longitude, list[seg.start].Latitude] as [
        number,
        number
      ];
      const B = [list[seg.end].Longitude, list[seg.end].Latitude] as [
        number,
        number
      ];
      const P = targetPosition;

      const foot = GeoTool.line.foot([A, B], P);

      const dist = MathTool.distance(foot, P);

      if (dist < minFootDist) {
        minFootDist = dist;
        bestFoot = {
          point: foot,
          segment: {
            line: [A, B],
            startIndex: seg.start,
            endIndex: seg.end,
          },
        };
      }
    }

    return {
      nearestPoint: nearest,
      footPoint: bestFoot,
    };
  }

  findBestMatch(
    list: FileGpsItem[],
    target: RoadObjectEventRecord,
    timeWindow = 1000 * 60 // ms
  ): MatchResult | undefined {
    if (!list.length) return;

    const targetTime = target.EventTime.getTime();
    const gcj02 = target.Location?.GCJ02;
    const targetPosition = [gcj02?.Longitude, gcj02?.Latitude] as [
      number,
      number
    ];

    // 1️⃣ 找时间最接近的点
    let closestIndex = 0;
    let minTimeDiff = Infinity;

    for (let i = 0; i < list.length; i++) {
      const diff = Math.abs(list[i].OSDTime!.getTime() - targetTime);
      if (diff < minTimeDiff) {
        minTimeDiff = diff;
        closestIndex = i;
      }
    }

    // 2️⃣ 收集候选（带 index）
    const candidates: { point: FileGpsItem; index: number }[] = [];

    // 向前
    for (let i = closestIndex; i >= 0; i--) {
      const diff = Math.abs(list[i].OSDTime!.getTime() - targetTime);
      if (diff <= timeWindow) {
        candidates.push({ point: list[i], index: i });
      } else break;
    }

    // 向后
    for (let i = closestIndex + 1; i < list.length; i++) {
      const diff = Math.abs(list[i].OSDTime!.getTime() - targetTime);
      if (diff <= timeWindow) {
        candidates.push({ point: list[i], index: i });
      } else break;
    }

    // 3️⃣ 距离筛选
    let best: MatchResult | undefined;
    let minDist = Infinity;

    for (const item of candidates) {
      const dist = GeoTool.point.distance(
        [item.point.Longitude, item.point.Latitude],
        targetPosition
      );

      if (dist < minDist) {
        minDist = dist;
        best = {
          point: item.point,
          index: item.index,
        };
      }
    }

    return best;
  }

  get = {
    color: {
      event: (type: RoadObjectEventType) => {
        switch (type) {
          case RoadObjectEventType.Inspection:
            return ColorTool.green;
          case RoadObjectEventType.Breakage:
            return ColorTool.orange;
          case RoadObjectEventType.Disappear:
            return ColorTool.red;
          default:
            return '';
        }
      },
      object: (type: RoadObjectType) => {
        switch (type) {
          case RoadObjectType.FireHydrant:
            return ColorTool.sky;
          case RoadObjectType.BusStation:
            return ColorTool.cyan;
          case RoadObjectType.Passage:
            return ColorTool.pink;
          case RoadObjectType.TelephoneBooth:
            return ColorTool.purple;
          case RoadObjectType.TrashCan:
            return ColorTool.white;
          default:
            return '';
        }
      },
    },
    icon: {
      load: (data: RoadObjectEventRecord, size: number) => {
        let icon = this.get.icon.inner(data.RoadObjectType);
        let color = this.get.color.event(data.EventType);
        return this.get.icon.svg(size, color, icon);
      },
      svg: (size: number, color: string, icon: string) => {
        return `<svg viewBox="0 0 24 24" style="        
        width:${size}px;height:${size}px;
        color:${color};filter:drop-shadow(0 0 3px ${color}66);
      ">${icon}</svg>`;
      },
      path: (type: RoadObjectType) => {
        switch (type) {
          case RoadObjectType.FireHydrant:
            return PathTool.image.svg.firehydrant.path;
          case RoadObjectType.BusStation:
            return PathTool.image.svg.busstation.path;
          case RoadObjectType.Passage:
            return PathTool.image.svg.passage.path;
          case RoadObjectType.TelephoneBooth:
            return PathTool.image.svg.telephonebooth.path;
          case RoadObjectType.TrashCan:
            return PathTool.image.svg.trashcan.path;
          default:
            return '';
        }
      },
      inner: (type: RoadObjectType) => {
        switch (type) {
          case RoadObjectType.FireHydrant:
            return PathTool.image.svg.firehydrant.inner;
          case RoadObjectType.BusStation:
            return PathTool.image.svg.busstation.inner;
          case RoadObjectType.Passage:
            return PathTool.image.svg.passage.inner;
          case RoadObjectType.TelephoneBooth:
            return PathTool.image.svg.telephonebooth.inner;
          case RoadObjectType.TrashCan:
            return PathTool.image.svg.trashcan.inner;
          default:
            return '';
        }
      },
    },
  };
}
interface MatchResult {
  point: FileGpsItem;
  index: number;
}

interface Result {
  nearestPoint: {
    point: FileGpsItem;
    index: number;
  };
  footPoint: {
    point: GeoPoint;
    segment: {
      line: GeoLine;
      startIndex: number;
      endIndex: number;
    };
  } | null;
}
