import { GeoPoint } from '../../../../../../../../../common/tools/geo-tool/geo.model';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';

const ICON_SIZE: [number, number] = [36, 36];

export class SystemModulePatrolSectionAMapSelectionMarkerController {
  constructor(private map: AMap.Map) {}

  private startMarker?: AMap.Marker;
  private endMarker?: AMap.Marker;

  /** 创建居中图标 */
  private createIcon(url: string): AMap.Icon {
    return new AMap.Icon({
      image: url,
      size: new AMap.Size(ICON_SIZE[0], ICON_SIZE[1]),
      imageSize: new AMap.Size(ICON_SIZE[0], ICON_SIZE[1]),
    });
  }

  /** 放置起点 marker */
  createStart(point: GeoPoint) {
    this.removeStart();
    this.startMarker = new AMap.Marker({
      position: point,
      icon: this.createIcon(PathTool.image.map.start),
      anchor: 'center',
      offset: new AMap.Pixel(0, 0),
      bubble: false,
      zIndex: 100,
    });
    this.map.add(this.startMarker);
  }

  /** 放置终点 marker */
  createEnd(point: GeoPoint) {
    this.removeEnd();
    this.endMarker = new AMap.Marker({
      position: point,
      icon: this.createIcon(PathTool.image.map.end),
      anchor: 'center',
      offset: new AMap.Pixel(0, 0),
      bubble: false,
      zIndex: 100,
    });
    this.map.add(this.endMarker);
  }

  /** 移除起点 marker */
  removeStart() {
    if (this.startMarker) {
      this.map.remove(this.startMarker);
      this.startMarker = undefined;
    }
  }

  /** 移除终点 marker */
  removeEnd() {
    if (this.endMarker) {
      this.map.remove(this.endMarker);
      this.endMarker = undefined;
    }
  }

  /** 清理所有 marker */
  clear() {
    this.removeStart();
    this.removeEnd();
  }
}
