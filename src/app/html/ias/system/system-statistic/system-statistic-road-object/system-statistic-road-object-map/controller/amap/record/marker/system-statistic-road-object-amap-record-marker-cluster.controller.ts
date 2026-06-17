import { EventEmitter } from '@angular/core';
import { RoadObjectEventType } from '../../../../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { EnumNameValue } from '../../../../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../../../../../common/data-core/requests/managers/manager';
import { ImageTool } from '../../../../../../../../../../common/tools/image-tool/image.tool';
import { PathTool } from '../../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapMarkerEvent } from '../../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker.model';
import { SystemStatisticRoadObjectAMapRecordMarkerLabelController } from './system-statistic-road-object-amap-record-marker-label.controller';

/**
 * 道路物件记录 AMap 标记聚合控制器
 *
 * 功能：将坐标完全相同的点位聚合成一个标记，
 * 聚合标记使用 blank.circle（线状）或 blank.point（点状）图标，
 * 并通过 ImageTool.svg 在图标上叠加聚合数量。
 */
export class SystemStatisticRoadObjectAMapRecordMarkerClusterController {
  event = {
    mouseover: new EventEmitter<RoadObjectEventRecord[]>(),
    mouseout: new EventEmitter<RoadObjectEventRecord[]>(),
    click: new EventEmitter<RoadObjectEventRecord[]>(),
    dblclick: new EventEmitter<RoadObjectEventRecord[]>(),
  };

  constructor(private manager: Manager) {}

  /**
   * 加载数据并聚合
   * @param datas 原始记录列表
   * @param event 事件发射器，用于给聚合标记注册事件
   * @param regist 普通标记的事件注册回调
   * @returns 聚合后的标记和控制器
   */
  async load(
    datas: RoadObjectEventRecord[],
    event: IASMapAMapMarkerEvent<RoadObjectEventRecord>,
    regist: (
      point: SystemStatisticRoadObjectAMapRecordMarkerLabelController,
    ) => void,
  ): Promise<ClusterResult> {
    // 通过注入的 Manager 获取线状物件类型，用于判断点位是 Line 还是 Point
    let lines = await this.manager.source.road.object.LineObjectTypes.get();

    let groups = this.group(datas);
    let markers: AMap.LabelMarker[] = [];
    let points: SystemStatisticRoadObjectAMapRecordMarkerLabelController[] = [];

    for (let [, items] of groups) {
      if (items.length === 1) {
        // 单个点位：沿用原有逻辑创建普通标记
        let data = items[0];
        let isline = lines.some((x) => x.Value == data.RoadObjectType);
        let point =
          new SystemStatisticRoadObjectAMapRecordMarkerLabelController(
            data as any,
            isline,
          );
        // [聚合] 通过回调完成事件注册
        regist(point);
        points.push(point);
        markers.push(await point.marker);
      } else {
        // 多个点位同坐标：创建聚合标记
        let marker = await this.cluster(items, lines);
        markers.push(marker);
      }
    }

    return { markers, points };
  }

  /** 按坐标分组 */
  private group(
    datas: RoadObjectEventRecord[],
  ): Map<string, RoadObjectEventRecord[]> {
    let groups = new Map<string, RoadObjectEventRecord[]>();
    for (let data of datas) {
      if (!data.Location) continue;
      let key = `${data.Location.GCJ02.Longitude},${data.Location.GCJ02.Latitude}`;
      let group = groups.get(key);
      if (group) {
        group.push(data);
      } else {
        groups.set(key, [data]);
      }
    }
    return groups;
  }

  /** 创建聚合标记 */
  private async cluster(
    items: RoadObjectEventRecord[],
    lines: EnumNameValue<number>[],
  ): Promise<AMap.LabelMarker> {
    // 颜色优先度：Breakage > 最近时间
    let data = this.pickRepresentative(items);
    let isline = lines.some((x) => x.Value == data.RoadObjectType);

    // 根据事件类型获取颜色名
    let colorName = this.getColorName(data.EventType);

    // 获取 blank 图标
    let blankIcon = this.getBlankIcon(isline, colorName);

    // 图标尺寸
    let size = SizeTool.map.object.get();

    // 用 ImageTool.svg.url 生成 data URI（图片以 base64 内嵌，无路径依赖）
    let imageUrl = await ImageTool.svg.url(
      blankIcon.normal,
      items.length.toString(),
      {
        size: { width: size[0], height: size[1] },
        color: '#ffffff',
      },
    );

    // 创建标记
    let position: [number, number] = [
      data.Location!.GCJ02.Longitude,
      data.Location!.GCJ02.Latitude,
    ];
    let marker = new AMap.LabelMarker({
      icon: {
        type: 'image',
        image: imageUrl,
        size: size,
        anchor: isline ? 'center' : 'bottom-center',
      } as AMap.LabelMarkerIconOptions,
      position: position,
      title: `${data.RoadObjectName} 等${items.length}项`,
    });

    // [聚合] 注册事件，批量抛出聚合组内全部元数据
    marker.on('mouseover', () => this.event.mouseover.emit(items));
    marker.on('mouseout', () => this.event.mouseout.emit(items));
    marker.on('click', () => this.event.click.emit(items));
    marker.on('dblclick', () => this.event.dblclick.emit(items));

    return marker;
  }

  /**
   * 选取聚合组的代表记录
   * 优先度：EventType=Breakage > EventTime 最近
   */
  private pickRepresentative(
    items: RoadObjectEventRecord[],
  ): RoadObjectEventRecord {
    // 1. 优先找 Breakage
    let breakage = items.find(
      (x) => x.EventType === RoadObjectEventType.Breakage,
    );
    if (breakage) return breakage;

    // 2. 取 EventTime 最近的
    return items.reduce((latest, item) =>
      item.EventTime > latest.EventTime ? item : latest,
    );
  }

  /** 根据事件类型映射颜色名 */
  private getColorName(eventType?: RoadObjectEventType): string {
    switch (eventType) {
      case RoadObjectEventType.Inspection:
        return 'green';
      case RoadObjectEventType.Breakage:
        return 'orange';
      case RoadObjectEventType.Disappear:
        return 'red';
      default:
        return 'gray';
    }
  }

  /** 获取 blank 图标 */
  private getBlankIcon(isline: boolean, colorName: string): { normal: string } {
    let blank = PathTool.image.map.object.blank;
    if (isline) {
      // 线状物件使用 blank.circle
      let a = blank.circle.end[colorName as keyof typeof blank.circle.end];
      console.log(a);
      return a;
    } else {
      // 点状物件使用 blank.point
      return blank.point[colorName as keyof typeof blank.point];
    }
  }
}
/** 按坐标聚合后的结果 */
interface ClusterResult {
  /** 聚合后的标记（含普通和聚合） */
  markers: AMap.LabelMarker[];
  /** 普通标记对应的控制器（用于事件注册） */
  points: SystemStatisticRoadObjectAMapRecordMarkerLabelController[];
}
