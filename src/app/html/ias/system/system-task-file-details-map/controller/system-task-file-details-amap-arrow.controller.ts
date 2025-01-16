import { MapTool } from '../../../../../common/tools/map-tool/map.tool';

declare var AMap: any;
export class SystemTaskFileDetailsAMapArrowController {
  constructor(private map: any) {
    this.init();
    this.regist();
  }

  private _arrow?: any;
  private get arrow() {
    if (!this._arrow) {
      this._arrow = new AMap.Marker({
        map: this.map,
        icon: '/assets/image/map/arrow_1.png',
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

  set(position: number[]) {
    this.arrow.setPosition(position);
  }

  center(position: number[]) {
    this.map.setCenter(position);
  }

  direction1(position: number[][]) {
    let angle = MapTool.direction(
      position[0][1],
      position[0][0],
      position[1][1],
      position[1][0]
    );

    this.arrow.setAngle(angle);
  }

  direction(angle: number) {
    this.arrow.setAngle(angle);
  }
}
