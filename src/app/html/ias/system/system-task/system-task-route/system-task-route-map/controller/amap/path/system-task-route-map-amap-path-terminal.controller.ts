export class SystemTaskRouteMapAMapPathTerminalController {
  constructor(private map: AMap.Map) {}

  private point?: {
    begin: AMap.Marker;
    end: AMap.Marker;
  };

  load(begin: [number, number], end: [number, number]) {
    let _begin = new AMap.Marker({
      map: this.map,
      icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
      position: begin,
      offset: new AMap.Pixel(-13, -30),
    });
    let _end = new AMap.Marker({
      map: this.map,
      icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
      position: end,
      offset: new AMap.Pixel(-13, -30),
    });
    this.point = {
      begin: _begin,
      end: _end,
    };
  }

  clear() {
    if (this.point) {
      this.map.remove([this.point.begin, this.point.end]);
    }
  }
}
