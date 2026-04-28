import { GeoPolyline } from './geo.model';

export class GeoPolylineConvertTool {
  json<T>(lines: GeoPolyline[], source?: T[]) {
    return {
      type: 'FeatureCollection',
      features: lines.map((line, i) =>
        this.item(line, source ? source[i] : undefined)
      ),
    };
  }
  private item<T>(line: GeoPolyline, source?: T) {
    return {
      type: 'Feature',
      properties: source,
      geometry: {
        type: 'LineString',
        coordinates: [...line],
      },
    };
  }
}
