export class SystemTaskRouteMapAMapLabelController {
  constructor(private map: AMap.Map) {}
  private marker = new AMap.Marker({
    anchor: 'bottom-center',
    offset: new AMap.Pixel(0, -15),
  });
  show(position: [number, number], text: string) {
    this.marker.setContent(
      '<div class="amap-info-window">' +
        '<div class="amap-info-window-content">' +
        text +
        '</div>' +
        '<div class="amap-info-sharp"></div>' +
        '</div>'
    );
    this.marker.setPosition(position);
    this.marker.setMap(this.map);
  }
  hide() {
    this.map.remove(this.marker);
  }
}
