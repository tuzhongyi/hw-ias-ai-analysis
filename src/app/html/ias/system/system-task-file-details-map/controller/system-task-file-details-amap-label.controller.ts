declare var AMap: any;
export class SystemTaskFileDetailsAMapLabelController {
  constructor(private map: any) {}
  private marker = new AMap.Marker({
    anchor: 'bottom-center',
    offset: new AMap.Pixel(0, -15),
  });
  show(position: number[], text: string) {
    this.marker.setContent(
      '<div class="amap-info-window">' +
        text +
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
