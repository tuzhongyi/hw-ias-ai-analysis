import { GeoPolyline } from './geo.model';

export class GeoPolylineConvertTool {
  json<T>(lines: GeoPolyline[], source?: T[]) {
    const features: any[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line && line.length > 0) {
        features.push(this.item(line, source ? source[i] : undefined));
      }
    }
    return {
      type: 'FeatureCollection',
      features,
    };
  }
  private item<T>(line: GeoPolyline, source?: T) {
    return {
      type: 'Feature',
      properties: source,
      geometry: {
        type: 'LineString',
        coordinates: line.map(
          (x) =>
            [
              typeof x[0] === 'number' ? x[0] : 0,
              typeof x[1] === 'number' ? x[1] : 0,
            ] as [number, number],
        ),
      },
    };
  }
}
