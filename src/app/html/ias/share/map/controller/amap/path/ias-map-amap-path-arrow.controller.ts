import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';

export class IASMapAMapPathArrowController {
  constructor(private map: AMap.Map) {
    this.init();
    this.regist();
  }

  private _arrow?: AMap.Marker;
  private get arrow(): AMap.Marker {
    if (!this._arrow) {
      this._arrow = new AMap.Marker({
        map: this.map,
        icon: PathTool.image.map.arrow._1,
        offset: new AMap.Pixel(-18, -18),
      });
    }
    return this._arrow;
  }

  private init() {
    // this.focus = LocalStorageService.gps.get();
  }
  private regist() {
    // this.element.focus.addEventListener('click', () => {
    //   this.focus = !this.focus;
    //   LocalStorageService.gps.save(this.focus);
    // });
  }

  set(position: [number, number]) {
    this.arrow.setPosition(position);
  }

  direction1(position: [number, number][]) {
    let angle = GeoTool.point.direction(position[0], position[1]);
    this.arrow.setAngle(angle);
    return angle;
  }

  direction(angle: number) {
    this.arrow.setAngle(angle);
    return angle;
  }
}
