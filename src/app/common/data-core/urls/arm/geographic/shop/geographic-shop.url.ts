import { AbstractUrl } from '../../../abstract.url';

export class GeographicShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Shops`);
  }

  excel = {
    upload: (isWGS84: boolean = true) => {
      return `${this.basic()}/Excels?IsWGS84=${isWGS84}`;
    },
    download: (querys: { roadId?: string; oriRoadId?: string }) => {
      let query = '';
      if (querys.roadId) {
        query += `RoadId=${querys.roadId}`;
      }
      if (querys.oriRoadId) {
        if (query.length > 0) {
          query += '&';
        }
        query += `OriRoadId=${querys.oriRoadId}`;
      }
      return `${this.basic()}/Excels?${query}`;
    },
  };

  task = {
    compare: () => {
      return `${this.basic()}/TaskCompare`;
    },
    detected: {
      result: () => {
        return `${this.basic()}/TaskDetectedResults`;
      },
    },
  };
}
