export class SystemTaskRouteMapAMapPathTerminalController {
  constructor(private map: AMap.Map) {}

  private point?: {
    begin: AMap.Marker;
    end: AMap.Marker;
  };

  load(begin: [number, number], end: [number, number]) {
    let _begin = new AMap.Marker({
      map: this.map,
      icon: new AMap.Icon({
        image: '/assets/image/map/start.png',
        size: new AMap.Size(48, 48),
        imageOffset: new AMap.Pixel(0, 0),
        imageSize: new AMap.Size(48, 48),
      }),
      position: begin,
      offset: new AMap.Pixel(-24, -24),
    });
    let _end = new AMap.Marker({
      map: this.map,
      icon: new AMap.Icon({
        image: '/assets/image/map/end.png',
        size: new AMap.Size(48, 48),
        imageOffset: new AMap.Pixel(0, 0),
        imageSize: new AMap.Size(48, 48),
      }),
      position: end,
      offset: new AMap.Pixel(-24, -24),
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
