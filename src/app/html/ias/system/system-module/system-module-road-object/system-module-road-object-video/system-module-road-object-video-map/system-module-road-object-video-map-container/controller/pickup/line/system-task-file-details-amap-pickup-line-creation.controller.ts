export class SystemTaskFileDetailsAMapPickupLineCreationController {
  constructor(private map: AMap.Map) {}

  private polyline?: AMap.Polyline;
  private points: [number, number][] = [];

  load(positions: [number, number][]) {
    if (positions.length === 0) return;
    this.points = positions;
    this.polyline = new AMap.Polyline({
      path: [...positions],
      strokeWeight: 6,
      strokeColor: '#32b33e',
      lineJoin: 'round',
      lineCap: 'round',
      cursor: 'pointer',
    });
    this.map.add(this.polyline);
  }

  clear() {
    if (this.polyline) {
      this.map.remove(this.polyline);
      this.polyline = undefined;
    }
  }
}
