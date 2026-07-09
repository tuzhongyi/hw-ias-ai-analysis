import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';
import { GeoPolyline } from '../../../../../../../../../common/tools/geo-tool/geo.model';

export class SystemModulePatrolSectionAMapSelectionLineController {
  constructor(private map: AMap.Map) {}

  private previewLine?: AMap.Polyline;

  /** 创建沿轨道的预览路径 */
  create(positions: GeoPolyline) {
    this.remove();
    if (positions.length >= 2) {
      this.previewLine = new AMap.Polyline({
        path: positions,
        strokeColor: ColorTool.orange,
        strokeWeight: 6,
        strokeOpacity: 0.8,
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 99,
        bubble: true,
      });
      this.map.add(this.previewLine);
    }
  }

  /** 更新预览路径（鼠标移动时） */
  update(positions: GeoPolyline) {
    if (this.previewLine) {
      if (positions.length >= 2) {
        this.previewLine.setPath(positions);
      }
    } else {
      this.create(positions);
    }
  }

  /** 移除预览路径 */
  remove() {
    if (this.previewLine) {
      this.map.remove(this.previewLine);
      this.previewLine = undefined;
    }
  }
}
