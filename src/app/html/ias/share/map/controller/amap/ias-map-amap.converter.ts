import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';

export class IASMapAMapConverter {
  geo = {
    line: (data: Road) => {
      let geo: any = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: data,
            geometry: {
              type: 'LineString',
              coordinates:
                data.GeoLine?.map((x) => [x.Longitude, x.Latitude]) ?? [],
            },
          },
        ],
      };
      return new Loca.GeoJSONSource({ data: geo });
    },
    point: <T>(datas: [number, number][], source: T[]) => {
      let geo: any = {
        type: 'FeatureCollection',
        features: datas.map((x, i) => {
          let data = {
            type: 'Feature',
            properties: source[i],
            geometry: {
              type: 'Point',
              coordinates: [...x],
            },
          };
          return data;
        }),
      };
      return new Loca.GeoJSONSource({ data: geo });
    },
  };
}
