import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { ILocation } from '../../../../../../common/data-core/models/model.interface';

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
    point: (datas: ILocation[]) => {
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
                coordinates: [point.GCJ02.Longitude, point.GCJ02.Latitude],
              },
            };
            return data;
          }),
      };
      return new Loca.GeoJSONSource({ data: geo });
    },
  };
}
