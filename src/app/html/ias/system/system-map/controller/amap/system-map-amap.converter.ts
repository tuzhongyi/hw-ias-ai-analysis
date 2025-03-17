import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';

export class SystemMapAMapConverter {
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
    point: (datas: Shop[]) => {
      let geo: any = {
        type: 'FeatureCollection',
        features: datas
          .filter((x) => !!x.Location)
          .map((x) => {
            let point = x.Location!;
            let data = {
              type: 'Feature',
              properties: x,
              geometry: {
                type: 'Point',
                coordinates: [point.Longitude, point.Latitude],
              },
            };
            return data;
          }),
      };
      return new Loca.GeoJSONSource({ data: geo });
    },
  };
}
