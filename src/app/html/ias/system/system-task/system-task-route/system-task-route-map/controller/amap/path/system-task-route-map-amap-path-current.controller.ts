export class SystemTaskRouteMapAMapPathCurrentController {
  constructor(private map: AMap.Map) {}

  private marker?: AMap.CircleMarker;

  private create(position: [number, number]) {
    var marker = new AMap.CircleMarker({
      center: position,
      radius: 10, //3D视图下，CircleMarker半径不要超过64px
      strokeColor: '#2d76ce',
      strokeWeight: 2,
      fillColor: 'rgba(19, 34, 77, 0.5)',
      fillOpacity: 0.5,
      zIndex: 10,
      bubble: true,
      cursor: 'pointer',
      clickable: false,
    });
    return marker;
  }

  show(position: [number, number]) {
    if (this.marker) {
      this.marker.setCenter(position);
    } else {
      this.marker = this.create(position);
      this.map.add(this.marker);
    }
  }
  hide() {
    if (this.marker) {
      this.map.remove(this.marker);
      this.marker = undefined;
    }
  }
}
