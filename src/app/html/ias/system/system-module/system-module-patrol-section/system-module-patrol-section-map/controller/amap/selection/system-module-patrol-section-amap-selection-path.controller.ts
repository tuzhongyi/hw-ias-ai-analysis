import { EventEmitter } from '@angular/core';
import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';
import { GeoPolyline } from '../../../../../../../../../common/tools/geo-tool/geo.model';

export class SystemModulePatrolSectionAMapSelectionPathController {
  /** 选中路径段时触发 */
  selected = new EventEmitter<GeoPolyline>();

  constructor(private map: AMap.Map) {}

  private selectedLine?: AMap.Polyline;

  /** 直接绘制给定的路径段（点位已由上层截取好） */
  drawPath(positions: GeoPolyline): GeoPolyline {
    this.clearLine();
    if (positions.length >= 2) {
      this.selectedLine = new AMap.Polyline({
        path: positions,
        strokeColor: ColorTool.sky,
        strokeWeight: 6,
        strokeOpacity: 0.8,
        lineJoin: 'round',
        lineCap: 'round',
        cursor: 'pointer',
        zIndex: 98,
      });
      this.map.add(this.selectedLine);
      this.selected.emit(positions);
    }
    return positions;
  }

  /** 移除高亮路径 */
  clearLine() {
    if (this.selectedLine) {
      this.map.remove(this.selectedLine);
      this.selectedLine = undefined;
    }
  }

  /** 清理全部 */
  clear() {
    this.clearLine();
  }
}
